Ice.ui.background = {
    popup: "<div class='changebackground'>\
        <div class='backgroundtype'>\
            <input type='radio' name='backgroundtype' value='img'  checked='checked'>Image</input>\
            <input type='radio' name='backgroundtype' value='swf'>Animated background</input>\
            <input type='radio' name='backgroundtype' value='local'>Upload background</input>\
        </div><div class='backgrounds'></div>\
    </div>",
    set: function () {
        $('#background').css('background', '');
        $('#background').html('');
        if (typeof Ice.data.bgType == 'undefined') {
            switch (Ice.settings.defaultBgType) {
                case 'swf':
                    $('#background').html('<object width="100%" height="100%">\
                        <param name="movie" value="assets/images/bg/' + Ice.settings.defaultBgType + '/' + Ice.settings.defaultBg + '">\
                        <param name="scale" value="noborder">\
                        <param name="wmode" value="opaque">\
                        <embed src="assets/images/bg/' + Ice.settings.defaultBgType + '/' + Ice.settings.defaultBg + '" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" scale="noborder" align="top" wmode="opaque">\
                        </embed>\
                    </object>');
                    break;
                default:
                    $('#background').css('background', 'url(' + Ice.settings.defaultBg + ')');
                    break;
            }
        }
        else {
            switch (Ice.data.bgType) {
                case  'swf':
                    $('#background').html('<object width="100%" height="100%">\
                        <param name="movie" value="assets/images/bg/' + Ice.data.bgType + '/' + Ice.data.bg + '">\
                        <param name="scale" value="noborder">\
                        <param name="wmode" value="opaque">\
                        <embed src="assets/images/bg/' + Ice.data.bgType + '/' + Ice.data.bg + '" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" scale="noborder" align="top" wmode="opaque">\
                        </embed>\
                     </object>');
                    break;
                case 'local':
                    $('#background').css('background', 'url(' + Ice.data.bg + ')');
                    break;
                default:
                    $('#background').css('background', 'url(' + Ice.ui.backgrounds.url + Ice.data.bg + ')');
                    break;
            }
        }
        return false;
    },
    updateBackgroundList: function () {
        if ($('input:radio[name="backgroundtype"]:checked').length != 0) {
            var bgType = $('input:radio[name="backgroundtype"]:checked').val();
            $('.changebackground .backgrounds').html('');

            var final = '';
            switch(bgType) {
                default:
                    $.each(Ice.ui.backgrounds.img, function (i, e) {
                        final += '<h2>' + e[0][0] + ':</h2><hr /><ul class="backgroundlist">';
                        $.each(e, function (k, v) {
                            final += '<li class="button' + ((v[1] == Ice.data.bg) ? ' button-active' : '') + '" data-value="' + v[1] + '">' + v[0] + '</li>';
                        });
                        final += '</ul><hr />';
                    });
                    break;
                case 'local':
                    final = '<input type="file" id="backgroundFile">';
                    break;
                case 'swf':
                    var list = [];
                    for (var i = 0; i <= Ice.ui.backgrounds.swf.length - 1; i++) {
                        list[i] = '<li class="button' + ((Ice.ui.backgrounds.swf[i][1] == Ice.data.bg) ? ' button-active' : '') + '" data-value="' + Ice.ui.backgrounds.swf[i][1] + '">' + Ice.ui.backgrounds.swf[i][0] + '</li>';
                    }
                    final = '<div class="backgroundlist">' + list.join('') + '</div>';
                    break;
            }
            $('.changebackground .backgrounds').html(final);

            $('.backgroundlist li').click(function () {
                Ice.data.bgType = bgType;
                Ice.data.bg = $(this).data('value');
                Ice.fn.data.updateData();
                Ice.ui.background.set();
                Ice.ui.modal.hide();
            });

            $('#backgroundFile').on('change', function() {
                var file = document.getElementById('backgroundFile').files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    Ice.data.bgType = 'local';
                    Ice.data.bg = reader.result;
                    Ice.fn.data.updateData();
                    Ice.ui.background.set();
                    Ice.ui.modal.hide();
                };
                reader.readAsDataURL(file);
            });
        }
        return false;
    }
}