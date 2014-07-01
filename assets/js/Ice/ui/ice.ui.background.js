Ice.ui.background = {
    popup: "<div class='changebackground'>\
        <div class='backgroundtype'>\
            <input type='radio' name='backgroundtype' value='img'  checked='checked'>Image</input>\
            <input type='radio' name='backgroundtype' value='swf'>Animated background</input>\
        </div><div class='backgrounds'></div>\
    </div>",
    set: function() {
        $('#background').css('background', '');
        $('#background').html('');
        if(typeof Ice.data.bgType == 'undefined') {
            if(Ice.settings.defaultBgType == 'swf') {
                $('#background').html('<object width="100%" height="100%">\
                    <param name="movie" value="assets/images/bg/'+Ice.settings.defaultBgType+'/'+Ice.settings.defaultBg+'">\
                    <param name="scale" value="noborder">\
                    <param name="wmode" value="opaque">\
                    <embed src="assets/images/bg/'+Ice.settings.defaultBgType+'/'+Ice.settings.defaultBg+'" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" scale="noborder" align="top" wmode="opaque">\
                    </embed>\
                </object>');
            } else {
                $('#background').css('background', 'url('+Ice.settings.defaultBg+')');
            }
        }
         else {
             if(Ice.data.bgType == 'swf') {
                $('#background').html('<object width="100%" height="100%">\
                    <param name="movie" value="assets/images/bg/'+Ice.data.bgType+'/'+Ice.data.bg+'">\
                    <param name="scale" value="noborder">\
                    <param name="wmode" value="opaque">\
                    <embed src="assets/images/bg/'+Ice.data.bgType+'/'+Ice.data.bg+'" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" scale="noborder" align="top" wmode="opaque">\
                    </embed>\
                </object>');
            } else {
                $('#background').css('background', 'url('+Ice.ui.backgrounds.url+Ice.data.bg+')');
            }
        }
        return false;
    },
    updateBackgroundList: function() {
        if($('input:radio[name="backgroundtype"]:checked').length != 0) {
            var bgType = $('input:radio[name="backgroundtype"]:checked').val();
            $('.changebackground .backgrounds').html('');

            if(bgType=='img') {

                var final = '';
                $.each(Ice.ui.backgrounds.img, function(i,e) {
                    final += '<h2>'+e[0][0]+':</h2><hr /><ul class="backgroundlist">';

                    $.each(e, function(k, v) {
                        final += '<li class="button'+((v[1] == Ice.data.bg) ? ' button-active':'')+'" data-value="'+v[1]+'">'+v[0]+'</li>';;
                    });
                    final += '</ul><hr />';
                });
                $('.changebackground .backgrounds').html(final);
            }
            else {
                var list = [];
                for(var i=0; i<= Ice.ui.backgrounds.swf.length-1; i++) {
                    list[i] = '<li class="button'+((Ice.ui.backgrounds.swf[i][1] == Ice.data.bg) ? ' button-active':'')+'" data-value="'+Ice.ui.backgrounds.swf[i][1]+'">'+Ice.ui.backgrounds.swf[i][0]+'</li>';
                }
                $('.changebackground .backgrounds').html('<div class="backgroundlist">' + list.join('') + '</div>');
            }

            $('.backgroundlist li').click(function() {
                Ice.data.bgType = bgType;
                Ice.data.bg = $(this).data('value');
                Ice.fn.data.updateData();
                Ice.ui.background.set();
                Ice.ui.modal.hide();
            });
        }
        return false;
    }
}