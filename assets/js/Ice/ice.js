var Ice = {};
Ice.data = {

}
Ice.settings = {
    cookieExpire: 365,
    validRegions: ['na', 'euw', 'eune', 'oce'],
    defaultBgType: 'img',
    defaultBg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Anivia_5.jpg',
    defaultNewsFeed: 'http://eune.leagueoflegends.com/en/rss.xml'
}
Ice.fn = {
    setSummonerName: function(name) {
        Ice.data.summonerName=name;
        Ice.fn.data.updateCookie();
    },
    setRegion: function(region) {
        if(Ice.settings.validRegions.indexOf(region) != -1) {
            Ice.data.region = region;
            Ice.fn.data.updateCookie();
            return true;
        } return false;
    },
    addBookmark: function(title, url) {
        if(typeof Ice.data.bookmarks == 'undefined') {
            Ice.data.bookmarks = [];
            Ice.data.bookmarks.push({title: title, url:url});
            Ice.fn.data.updateCookie();
        } else {
            if(Ice.data.bookmarks.indexOf({title: title, url:url}) == -1) {
                Ice.data.bookmarks.push({title: title, url:url});
                Ice.fn.data.updateCookie();
            }
        }
        return false;
    },
    removeBookmark: function(index) {
        if(typeof Ice.data.bookmarks != 'undefined') {
            Ice.data.bookmarks.splice(index, 1);
            Ice.fn.data.updateCookie();
        }
        return false;
    },
    setNewsFeed: function(url) {
        Ice.data.newsfeed = url;
    },
    enableAnimations: function() {
        Ice.data.animations=true; Ice.fn.data.updateCookie(); return false;
    },
    disableAnimations: function() {
        Ice.data.animations=false; Ice.fn.data.updateCookie(); return false;
    },
    setSidebarState: function(bool) {
        Ice.data.sidebarOpen = bool;
        Ice.fn.data.updateCookie();
        return false;
    }
}
Ice.fn.data = {
    toString: function() { return JSON.stringify(Ice.data); },
    clear: function() { Ice.data = {}},
    updateCookie: function() {
        $.cookie('data', Ice.fn.data.toString(), {
            expires: Ice.settings.cookieExpire
        });
    },
    updateFromCookie: function() {
        if(typeof $.cookie('data') == 'undefined') {
            
        } else {
            Ice.data = JSON.parse($.cookie('data'));
        }
    },
    clearCookie: function() {
        $.removeCookie('data');    
    }           
}
Ice.fn.stringBuilder = function(string) {
    this.s=string;
    this.fs = string;
};
Ice.fn.stringBuilder.prototype.bindParam = function(paramname, value) {
    this.fs = this.fs.replace(new RegExp(paramname, 'g'), value);
}
Ice.fn.stringBuilder.prototype.get = function() {
    return this.fs
};
Ice.ui = {};
Ice.ui.background = {};
Ice.ui.modal = {};
Ice.ui.settings = {};
Ice.ui.sidebar = {};
Ice.ui.bookmarks = {};
Ice.ui.newsfeed = {};