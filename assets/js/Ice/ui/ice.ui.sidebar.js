Ice.ui.sidebar = {
    speed: 200,
    show: function() {
        $('.sidebar').css('left', -$('.sidebar').outerWidth());
        $('.sidebar').css('display', 'block');
        $('.sidebar').animate({left: 0}, this.speed);
        $('#sidebar-button').animate({left: $('.sidebar').outerWidth()-10}, this.speed);
        return false;
    },
    hide: function() {
        $('.sidebar').animate({left: -$('.sidebar').outerWidth()}, this.speed, function() {
            $('.sidebar').css('display', 'none');
        });
        $('#sidebar-button').animate({left: -10}, this.speed);
        return false;
    },
    toggle: function() {
        if($('.sidebar').css('display') == 'none') {
            Ice.fn.setSidebarState(true);
            this.show();
        } else {
            Ice.fn.setSidebarState(false);
            this.hide();
        }
        return false;
    },
    reposition: function() {
        if($('.sidebar').css('display') != 'none') {
            $('#sidebar-button').css('left', $('.sidebar').outerWidth()-10);
        }
        return false;
    }
}