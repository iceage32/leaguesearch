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
        Ice.fn.data.updateData();
    },
    setRegion: function(region) {
        if(Ice.settings.validRegions.indexOf(region) != -1) {
            Ice.data.region = region;
            Ice.fn.data.updateData();
            return true;
        } return false;
    },
    addBookmark: function(title, url) {
        if(typeof Ice.data.bookmarks == 'undefined') {
            Ice.data.bookmarks = [];
            Ice.data.bookmarks.push({title: title, url:url});
            Ice.fn.data.updateData();
        } else {
            if(Ice.data.bookmarks.indexOf({title: title, url:url}) == -1) {
                Ice.data.bookmarks.push({title: title, url:url});
                Ice.fn.data.updateData();
            }
        }
        return false;
    },
    removeBookmark: function(index) {
        if(typeof Ice.data.bookmarks != 'undefined') {
            Ice.data.bookmarks.splice(index, 1);
            Ice.fn.data.updateData();
        }
        return false;
    },
    setNewsFeed: function(url) {
        Ice.data.newsfeed = url;
    },
    enableAnimations: function() {
        Ice.data.animations=true; Ice.fn.data.updateData(); return false;
    },
    disableAnimations: function() {
        Ice.data.animations=false; Ice.fn.data.updateData(); return false;
    },
    setSidebarState: function(bool) {
        Ice.data.sidebarOpen = bool;
        Ice.fn.data.updateData();
        return false;
    }
}
Ice.fn.data = {
    toString: function() { return JSON.stringify(Ice.data); },
    clear: function() { Ice.data = {}},
    updateData: function() {
        if(this.hasStorageSupport()) {
            localStorage['data'] = this.toString();
        } else {    
            $.cookie('data', this.toString(), {
                expires: Ice.settings.cookieExpire
            });
        }
    },
    updateFromData: function() {
        if(this.hasStorageSupport()) {
            if(typeof localStorage['data'] != 'undefined') {
                Ice.data = JSON.parse(localStorage['data']);
            }
        } else {    
            if(typeof $.cookie('data') != 'undefined') {
                Ice.data = JSON.parse($.cookie('data'));
            }
        }
    },
    clearCookie: function() {
        $.removeCookie('data');    
    },
    hasStorageSupport: function() {
        try {
            console.log('Using HTML5 Storage');
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            console.log('Falling back to cookie storage');
            return false;
        }
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