Ice.ui.modal = {
    speed: "normal",
    set: function(title, content) {
        $('#modal .title').html(title);
        $('#modal .content .container').html(content);
        $("#modal .close").bind('click', function() {Ice.ui.modal.hide();});
        return false;
    },
    show: function() {
        var enabled = false;
        if(typeof Ice.data.animations != 'undefined') {
            if(Ice.data.animations) {
                enabled = true;
            }
        }
        if(enabled) {
            $('.dimmer').fadeIn(this.speed);
            $('#modal').show(this.speed);
        } else {
            $('.dimmer').show();
            $('#modal').show();
        }
        return false;
    },
    hide: function() {
        var enabled = false;
        if(typeof Ice.data.animations != 'undefined') {
            if(Ice.data.animations) {
                enabled = true;
            }
        }
        if(enabled) {
            $('.dimmer').fadeOut(this.speed);
            $('#modal').hide(this.speed);
        } else {
            $('.dimmer').hide();
            $('#modal').hide();
        }
        return false;
    }
}