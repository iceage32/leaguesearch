Ice.ui = {
    modal: {
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
    },
    background: {
        popup: "<div class='changebackground'>\
            <div class='backgroundtype'>\
                <input type='radio' name='backgroundtype' value='img'  checked='checked'>Image</input>\
                <input type='radio' name='backgroundtype' value='swf'>Animated background</input>\
            </div><div class='container'><ul class='backgroundlist'></ul></div>\
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
                    $('#background').css('background', 'url('+Ice.data.bg+')');
                }
            }
            return false;
        },
        updateBackgroundList: function() {
            if($('input:radio[name="backgroundtype"]:checked').length != 0) {
                var bgType = $('input:radio[name="backgroundtype"]:checked').val();
                $('.backgroundlist').html('');

                var list = [];
                for(var i=0; i<= Ice.ui.backgrounds[bgType].length-1; i++) {
                    list[i] = '<li class="button'+((Ice.ui.backgrounds[bgType][i][1] == Ice.data.bg) ? ' button-active':'')+'" data-value="'+Ice.ui.backgrounds[bgType][i][1]+'">'+Ice.ui.backgrounds[bgType][i][0]+'</li>';
                }
                $('.backgroundlist').html(list.join(''));
                
                $('.backgroundlist li').click(function() {
                    Ice.data.bgType = bgType;
                    Ice.data.bg = $(this).data('value');
                    Ice.fn.data.updateCookie();
                    Ice.ui.background.set();
                    Ice.ui.modal.hide();
                });
            }
            return false;
        }
    },
    sidebar: {
        speed: 200,
        show: function() {
            $('.sidebar').css('left', -$('.sidebar').outerWidth());
            $('.sidebar').css('display', 'block');
            $('.sidebar').animate({left: 0}, this.speed);
            $('#sidebar-button').text('Close sidebar');
            $('#sidebar-button').animate({left: $('.sidebar').outerWidth()-10}, this.speed);
            return false;
        },
        hide: function() {
            $('.sidebar').animate({left: -$('.sidebar').outerWidth()}, this.speed, function() {
                $('.sidebar').css('display', 'none');
            });
            $('#sidebar-button').text('Open sidebar');
            $('#sidebar-button').animate({left: -10}, this.speed);
            return false;
        },
        toggle: function() {
            if($('.sidebar').css('display') == 'none') {
                this.show();
            } else this.hide();
            return false;
        },
        reposition: function() {
            if($('.sidebar').css('display') != 'none') {
                $('#sidebar-button').css('left', $('.sidebar').outerWidth()-10);
            }
            return false;
        }
    },
    settings: {
        initHandlers: function() {
            $('#modal input[type="checkbox"]').change(function() {
                switch($(this).data('option')) {
                    case 'animations':
                        if($(this).is(':checked')) {
                            Ice.fn.enableAnimations();
                        } else Ice.fn.disableAnimations();
                        break;
                }
            });
            //set summoner
            $('#settings-summonersubmit').click(function() {
                if(Ice.fn.setRegion($('#settings-summonerregion').val())) {
                    Ice.fn.setSummonerName($('#settings-summonername').val());
                    Ice.ui.modal.hide();
                    alert('Successfully set summoner information');
                    return true;
                } else {
                    alert('Please select a region');
                }
                return false;
            });
        },
        getSettingState: function(value) {
            return Ice.data[value];
        }
    }
}
Ice.ui.sidebar.pages = {
    normal: [
        {
            link: 'http://www.lolking.net/',
            favicon: 'assets/images/favicons/lolking.png',
            name: 'LoLKing'
        },
        {
            link: 'http://www.elophant.com/',
            favicon: 'assets/images/favicons/elophant.png',
            name: 'Elophant'
        },
        {
            link: 'http://www.championselect.net/',
            favicon: 'assets/images/favicons/championselect.png',
            name: 'Champion Select'
        },
        {
            link: 'http://lol.gamepedia.com/',
            favicon: 'assets/images/favicons/leaguepedia.png',
            name: 'Leaguepedia'
        },
        {
            link: 'http://lolesports.com/',
            favicon: 'assets/images/favicons/lolesports.png',
            name: 'LoL Esports'
        },
        {
            link: 'http://www.lolnexus.com/',
            favicon: 'assets/images/favicons/lolnexus.png',
            name: 'LoL Nexus'
        },
        {
            link: 'http://leagueoflegends.wikia.com/',
            favicon: 'assets/images/favicons/lolwiki.png',
            name: 'LoL Wiki'
        },
        {
            link: 'http://www.mobafire.com/',
            favicon: 'assets/images/favicons/mobafire.png',
            name: 'Mobafire'
        },
        {
            link: 'http://www.op.gg/',
            favicon: 'assets/images/favicons/opgg.png',
            name: 'op.gg'
        },
        {
            link: 'http://www.probuilds.net/',
            favicon: 'assets/images/favicons/probuilds.png',
            name: 'Pro Builds'
        },
        {
            link: 'http://www.reddit.com/r/leagueoflegends',
            favicon: 'assets/images/favicons/reddit.png',
            name: 'Reddit'
        },
        {
            link: 'http://www.reignofgaming.net/',
            favicon: 'assets/images/favicons/reignofgaming.png',
            name: 'Reign Of Gaming'
        },
        {
            link: 'http://www.surrenderat20.net/',
            favicon: 'assets/images/favicons/surrenderat20.png',
            name: 'Surrender@20'
        },
        {
            link: 'http://www.twitch.tv/directory/game/League%20of%20Legends',
            favicon: 'assets/images/favicons/twitch.png',
            name: 'Twitch.tv'
        }
    ],
    profile: [
        {
            link: 'http://www.lolking.net/search?name=:name&region=:region',
            favicon: 'assets/images/favicons/lolking.png',
            name: 'LoLKing'
        },
        {
            link: 'http://:region.op.gg/summoner/userName=:name',
            favicon: 'assets/images/favicons/opgg.png',
            name: 'op.gg'
        },
        {
            link: 'http://www.lolnexus.com/:region/search?name=:name&region=:region',
            favicon: 'assets/images/favicons/lolnexus.png',
            name: 'LoL Nexus'
        }
    ]
}
Ice.ui.backgrounds = {};
Ice.ui.backgrounds.swf = [
    ['Aatrox', 'bg-aatrox.swf'],
    ['Jinx', 'bg-jinx.swf'],
    ['Lissandra', 'bg-lissandra.swf'],
    ['Vel\'koz', 'bg-velkoz.swf'],
    ['Yasuo', 'bg-yasuo.swf'],
];
Ice.ui.backgrounds.url = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
Ice.ui.backgrounds.img = [
    ["Aatrox", Ice.ui.backgrounds.url + "Aatrox_0.jpg"],
    ["Justicar Aatrox", Ice.ui.backgrounds.url + "Aatrox_1.jpg"],
    ["Thresh", Ice.ui.backgrounds.url + "Thresh_0.jpg"],
    ["Deep Terror Thresh", Ice.ui.backgrounds.url + "Thresh_1.jpg"],
    ["Championship Thresh", Ice.ui.backgrounds.url + "Thresh_2.jpg"],
    ["Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_0.jpg"],
    ["Highland Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_1.jpg"],
    ["King Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_2.jpg"],
    ["Viking Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_3.jpg"],
    ["Demonblade Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_4.jpg"],
    ["Sultan Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_5.jpg"],
    ["Warring Kingdoms Tryndamere", Ice.ui.backgrounds.url + "Tryndamere_6.jpg"],
    ["Gragas", Ice.ui.backgrounds.url + "Gragas_0.jpg"],
    ["Scuba Gragas", Ice.ui.backgrounds.url + "Gragas_1.jpg"],
    ["Hillbilly Gragas", Ice.ui.backgrounds.url + "Gragas_2.jpg"],
    ["Santa Gragas", Ice.ui.backgrounds.url + "Gragas_3.jpg"],
    ["Gragas, Esq.", Ice.ui.backgrounds.url + "Gragas_4.jpg"],
    ["Vandal Gragas", Ice.ui.backgrounds.url + "Gragas_5.jpg"],
    ["Oktoberfest Gragas", Ice.ui.backgrounds.url + "Gragas_6.jpg"],
    ["Superfan Gragas", Ice.ui.backgrounds.url + "Gragas_7.jpg"],
    ["Cassiopeia", Ice.ui.backgrounds.url + "Cassiopeia_0.jpg"],
    ["Desperada Cassiopeia", Ice.ui.backgrounds.url + "Cassiopeia_1.jpg"],
    ["Siren Cassiopeia", Ice.ui.backgrounds.url + "Cassiopeia_2.jpg"],
    ["Mythic Cassiopeia", Ice.ui.backgrounds.url + "Cassiopeia_3.jpg"],
    ["Jade Fang Cassiopeia", Ice.ui.backgrounds.url + "Cassiopeia_4.jpg"],
    ["Poppy", Ice.ui.backgrounds.url + "Poppy_0.jpg"],
    ["Noxus Poppy", Ice.ui.backgrounds.url + "Poppy_1.jpg"],
    ["Lollipoppy", Ice.ui.backgrounds.url + "Poppy_2.jpg"],
    ["Blacksmith Poppy", Ice.ui.backgrounds.url + "Poppy_3.jpg"],
    ["Ragdoll Poppy", Ice.ui.backgrounds.url + "Poppy_4.jpg"],
    ["Battle Regalia Poppy", Ice.ui.backgrounds.url + "Poppy_5.jpg"],
    ["Scarlet Hammer Poppy", Ice.ui.backgrounds.url + "Poppy_6.jpg"],
    ["Ryze", Ice.ui.backgrounds.url + "Ryze_0.jpg"],
    ["Human Ryze", Ice.ui.backgrounds.url + "Ryze_1.jpg"],
    ["Tribal Ryze", Ice.ui.backgrounds.url + "Ryze_2.jpg"],
    ["Uncle Ryze", Ice.ui.backgrounds.url + "Ryze_3.jpg"],
    ["Triumphant Ryze", Ice.ui.backgrounds.url + "Ryze_4.jpg"],
    ["Professor Ryze", Ice.ui.backgrounds.url + "Ryze_5.jpg"],
    ["Zombie Ryze", Ice.ui.backgrounds.url + "Ryze_6.jpg"],
    ["Dark Crystal Ryze", Ice.ui.backgrounds.url + "Ryze_7.jpg"],
    ["Pirate Ryze", Ice.ui.backgrounds.url + "Ryze_8.jpg"],
    ["Sion", Ice.ui.backgrounds.url + "Sion_0.jpg"],
    ["Hextech Sion", Ice.ui.backgrounds.url + "Sion_1.jpg"],
    ["Barbarian Sion", Ice.ui.backgrounds.url + "Sion_2.jpg"],
    ["Lumberjack Sion", Ice.ui.backgrounds.url + "Sion_3.jpg"],
    ["Warmonger Sion", Ice.ui.backgrounds.url + "Sion_4.jpg"],
    ["Annie", Ice.ui.backgrounds.url + "Annie_0.jpg"],
    ["Goth Annie", Ice.ui.backgrounds.url + "Annie_1.jpg"],
    ["Red Riding Annie", Ice.ui.backgrounds.url + "Annie_2.jpg"],
    ["Annie in Wonderland", Ice.ui.backgrounds.url + "Annie_3.jpg"],
    ["Prom Queen Annie", Ice.ui.backgrounds.url + "Annie_4.jpg"],
    ["Frostfire Annie", Ice.ui.backgrounds.url + "Annie_5.jpg"],
    ["Reverse Annie", Ice.ui.backgrounds.url + "Annie_6.jpg"],
    ["FrankenTibbers Annie", Ice.ui.backgrounds.url + "Annie_7.jpg"],
    ["Panda Annie", Ice.ui.backgrounds.url + "Annie_8.jpg"],
    ["Karma", Ice.ui.backgrounds.url + "Karma_0.jpg"],
    ["Sun Goddess Karma", Ice.ui.backgrounds.url + "Karma_1.jpg"],
    ["Sakura Karma", Ice.ui.backgrounds.url + "Karma_2.jpg"],
    ["Traditional Karma", Ice.ui.backgrounds.url + "Karma_3.jpg"],
    ["Nautilus", Ice.ui.backgrounds.url + "Nautilus_0.jpg"],
    ["Abyssal Nautilus", Ice.ui.backgrounds.url + "Nautilus_1.jpg"],
    ["Subterranean Nautilus", Ice.ui.backgrounds.url + "Nautilus_2.jpg"],
    ["AstroNautilus", Ice.ui.backgrounds.url + "Nautilus_3.jpg"],
    ["Lux", Ice.ui.backgrounds.url + "Lux_0.jpg"],
    ["Sorceress Lux", Ice.ui.backgrounds.url + "Lux_1.jpg"],
    ["Spellthief Lux", Ice.ui.backgrounds.url + "Lux_2.jpg"],
    ["Commando Lux", Ice.ui.backgrounds.url + "Lux_3.jpg"],
    ["Imperial Lux", Ice.ui.backgrounds.url + "Lux_4.jpg"],
    ["Steel Legion Lux", Ice.ui.backgrounds.url + "Lux_5.jpg"],
    ["Ahri", Ice.ui.backgrounds.url + "Ahri_0.jpg"],
    ["Dynasty Ahri", Ice.ui.backgrounds.url + "Ahri_1.jpg"],
    ["Midnight Ahri", Ice.ui.backgrounds.url + "Ahri_2.jpg"],
    ["Foxfire Ahri", Ice.ui.backgrounds.url + "Ahri_3.jpg"],
    ["Popstar Ahri", Ice.ui.backgrounds.url + "Ahri_4.jpg"],
    ["Olaf", Ice.ui.backgrounds.url + "Olaf_0.jpg"],
    ["Forsaken Olaf", Ice.ui.backgrounds.url + "Olaf_1.jpg"],
    ["Glacial Olaf", Ice.ui.backgrounds.url + "Olaf_2.jpg"],
    ["Brolaf", Ice.ui.backgrounds.url + "Olaf_3.jpg"],
    ["Pentakill Olaf", Ice.ui.backgrounds.url + "Olaf_4.jpg"],
    ["Viktor", Ice.ui.backgrounds.url + "Viktor_0.jpg"],
    ["Full Machine Viktor", Ice.ui.backgrounds.url + "Viktor_1.jpg"],
    ["Prototype Viktor", Ice.ui.backgrounds.url + "Viktor_2.jpg"],
    ["Creator Viktor", Ice.ui.backgrounds.url + "Viktor_3.jpg"],
    ["Anivia", Ice.ui.backgrounds.url + "Anivia_0.jpg"],
    ["Team Spirit Anivia", Ice.ui.backgrounds.url + "Anivia_1.jpg"],
    ["Bird of Prey Anivia", Ice.ui.backgrounds.url + "Anivia_2.jpg"],
    ["Noxus Hunter Anivia", Ice.ui.backgrounds.url + "Anivia_3.jpg"],
    ["Hextech Anivia", Ice.ui.backgrounds.url + "Anivia_4.jpg"],
    ["Blackfrost Anivia", Ice.ui.backgrounds.url + "Anivia_5.jpg"],
    ["Garen", Ice.ui.backgrounds.url + "Garen_0.jpg"],
    ["Sanguine Garen", Ice.ui.backgrounds.url + "Garen_1.jpg"],
    ["Desert Trooper Garen", Ice.ui.backgrounds.url + "Garen_2.jpg"],
    ["Commando Garen", Ice.ui.backgrounds.url + "Garen_3.jpg"],
    ["Dreadknight Garen", Ice.ui.backgrounds.url + "Garen_4.jpg"],
    ["Rugged Garen", Ice.ui.backgrounds.url + "Garen_5.jpg"],
    ["Steel Legion Garen", Ice.ui.backgrounds.url + "Garen_6.jpg"],
    ["Singed", Ice.ui.backgrounds.url + "Singed_0.jpg"],
    ["Riot Squad Singed", Ice.ui.backgrounds.url + "Singed_1.jpg"],
    ["Hextech Singed", Ice.ui.backgrounds.url + "Singed_2.jpg"],
    ["Surfer Singed", Ice.ui.backgrounds.url + "Singed_3.jpg"],
    ["Mad Scientist Singed", Ice.ui.backgrounds.url + "Singed_4.jpg"],
    ["Augmented Singed", Ice.ui.backgrounds.url + "Singed_5.jpg"],
    ["Snow Day Singed", Ice.ui.backgrounds.url + "Singed_6.jpg"],
    ["Lissandra", Ice.ui.backgrounds.url + "Lissandra_0.jpg"],
    ["Bloodstone Lissandra", Ice.ui.backgrounds.url + "Lissandra_1.jpg"],
    ["Blade Queen Lissandra", Ice.ui.backgrounds.url + "Lissandra_2.jpg"],
    ["Maokai", Ice.ui.backgrounds.url + "Maokai_0.jpg"],
    ["Charred Maokai", Ice.ui.backgrounds.url + "Maokai_1.jpg"],
    ["Totemic Maokai", Ice.ui.backgrounds.url + "Maokai_2.jpg"],
    ["Festive Maokai", Ice.ui.backgrounds.url + "Maokai_3.jpg"],
    ["Haunted Maokai", Ice.ui.backgrounds.url + "Maokai_4.jpg"],
    ["Goalkeeper Maokai", Ice.ui.backgrounds.url + "Maokai_5.jpg"],
    ["Morgana", Ice.ui.backgrounds.url + "Morgana_0.jpg"],
    ["Exiled Morgana", Ice.ui.backgrounds.url + "Morgana_1.jpg"],
    ["Sinful Succulence Morgana", Ice.ui.backgrounds.url + "Morgana_2.jpg"],
    ["Blade Mistress Morgana", Ice.ui.backgrounds.url + "Morgana_3.jpg"],
    ["Blackthorn Morgana", Ice.ui.backgrounds.url + "Morgana_4.jpg"],
    ["Ghost Bride Morgana", Ice.ui.backgrounds.url + "Morgana_5.jpg"],
    ["Evelynn", Ice.ui.backgrounds.url + "Evelynn_0.jpg"],
    ["Shadow Evelynn", Ice.ui.backgrounds.url + "Evelynn_1.jpg"],
    ["Masquerade Evelynn", Ice.ui.backgrounds.url + "Evelynn_2.jpg"],
    ["Tango Evelynn", Ice.ui.backgrounds.url + "Evelynn_3.jpg"],
    ["Fizz", Ice.ui.backgrounds.url + "Fizz_0.jpg"],
    ["Atlantean Fizz", Ice.ui.backgrounds.url + "Fizz_1.jpg"],
    ["Tundra Fizz", Ice.ui.backgrounds.url + "Fizz_2.jpg"],
    ["Fisherman Fizz", Ice.ui.backgrounds.url + "Fizz_3.jpg"],
    ["Void Fizz", Ice.ui.backgrounds.url + "Fizz_4.jpg"],
    ["Zed", Ice.ui.backgrounds.url + "Zed_0.jpg"],
    ["Shockblade Zed", Ice.ui.backgrounds.url + "Zed_1.jpg"],
    ["SKT T1 Zed", Ice.ui.backgrounds.url + "Zed_2.jpg"],
    ["Heimerdinger", Ice.ui.backgrounds.url + "Heimerdinger_0.jpg"],
    ["Alien Invader Heimerdinger", Ice.ui.backgrounds.url + "Heimerdinger_1.jpg"],
    ["Blast Zone Heimerdinger", Ice.ui.backgrounds.url + "Heimerdinger_2.jpg"],
    ["Piltover Customs Heimerdinger", Ice.ui.backgrounds.url + "Heimerdinger_3.jpg"],
    ["Snowmerdinger", Ice.ui.backgrounds.url + "Heimerdinger_4.jpg"],
    ["Rumble", Ice.ui.backgrounds.url + "Rumble_0.jpg"],
    ["Rumble in the Jungle", Ice.ui.backgrounds.url + "Rumble_1.jpg"],
    ["Bilgerat Rumble", Ice.ui.backgrounds.url + "Rumble_2.jpg"],
    ["Super Galaxy Rumble", Ice.ui.backgrounds.url + "Rumble_3.jpg"],
    ["Mordekaiser", Ice.ui.backgrounds.url + "Mordekaiser_0.jpg"],
    ["Dragon Knight Mordekaiser", Ice.ui.backgrounds.url + "Mordekaiser_1.jpg"],
    ["Infernal Mordekaiser", Ice.ui.backgrounds.url + "Mordekaiser_2.jpg"],
    ["Pentakill Mordekaiser", Ice.ui.backgrounds.url + "Mordekaiser_3.jpg"],
    ["Lord Mordekaiser", Ice.ui.backgrounds.url + "Mordekaiser_4.jpg"],
    ["Sona", Ice.ui.backgrounds.url + "Sona_0.jpg"],
    ["Muse Sona", Ice.ui.backgrounds.url + "Sona_1.jpg"],
    ["Pentakill Sona", Ice.ui.backgrounds.url + "Sona_2.jpg"],
    ["Silent Night Sona", Ice.ui.backgrounds.url + "Sona_3.jpg"],
    ["Guqin Sona", Ice.ui.backgrounds.url + "Sona_4.jpg"],
    ["Arcade Sona", Ice.ui.backgrounds.url + "Sona_5.jpg"],
    ["Katarina", Ice.ui.backgrounds.url + "Katarina_0.jpg"],
    ["Mercenary Katarina", Ice.ui.backgrounds.url + "Katarina_1.jpg"],
    ["Red Card Katarina", Ice.ui.backgrounds.url + "Katarina_2.jpg"],
    ["Bilgewater Katarina", Ice.ui.backgrounds.url + "Katarina_3.jpg"],
    ["Kitty Cat Katarina", Ice.ui.backgrounds.url + "Katarina_4.jpg"],
    ["High Command Katarina", Ice.ui.backgrounds.url + "Katarina_5.jpg"],
    ["Sandstorm Katarina", Ice.ui.backgrounds.url + "Katarina_6.jpg"],
    ["Slay Belle Katarina", Ice.ui.backgrounds.url + "Katarina_7.jpg"],
    ["Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_0.jpg"],
    ["Caterpillar Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_1.jpg"],
    ["Sonoran Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_2.jpg"],
    ["Monarch Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_3.jpg"],
    ["Reindeer Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_4.jpg"],
    ["Lion Dance Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_5.jpg"],
    ["Deep Sea Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_6.jpg"],
    ["Jurassic Kog\'Maw", Ice.ui.backgrounds.url + "KogMaw_7.jpg"],
    ["Ashe", Ice.ui.backgrounds.url + "Ashe_0.jpg"],
    ["Freljord Ashe", Ice.ui.backgrounds.url + "Ashe_1.jpg"],
    ["Sherwood Forest Ashe", Ice.ui.backgrounds.url + "Ashe_2.jpg"],
    ["Woad Ashe", Ice.ui.backgrounds.url + "Ashe_3.jpg"],
    ["Queen Ashe", Ice.ui.backgrounds.url + "Ashe_4.jpg"],
    ["Amethyst Ashe", Ice.ui.backgrounds.url + "Ashe_5.jpg"],
    ["Heartseeker Ashe", Ice.ui.backgrounds.url + "Ashe_6.jpg"],
    ["Lulu", Ice.ui.backgrounds.url + "Lulu_0.jpg"],
    ["Bittersweet Lulu", Ice.ui.backgrounds.url + "Lulu_1.jpg"],
    ["Wicked Lulu", Ice.ui.backgrounds.url + "Lulu_2.jpg"],
    ["Dragon Trainer Lulu", Ice.ui.backgrounds.url + "Lulu_3.jpg"],
    ["Winter Wonder Lulu", Ice.ui.backgrounds.url + "Lulu_4.jpg"],
    ["Karthus", Ice.ui.backgrounds.url + "Karthus_0.jpg"],
    ["Phantom Karthus", Ice.ui.backgrounds.url + "Karthus_1.jpg"],
    ["Statue of Karthus", Ice.ui.backgrounds.url + "Karthus_2.jpg"],
    ["Grim Reaper Karthus", Ice.ui.backgrounds.url + "Karthus_3.jpg"],
    ["Pentakill Karthus", Ice.ui.backgrounds.url + "Karthus_4.jpg"],
    ["Alistar", Ice.ui.backgrounds.url + "Alistar_0.jpg"],
    ["Black Alistar", Ice.ui.backgrounds.url + "Alistar_1.jpg"],
    ["Golden Alistar", Ice.ui.backgrounds.url + "Alistar_2.jpg"],
    ["Matador Alistar", Ice.ui.backgrounds.url + "Alistar_3.jpg"],
    ["Longhorn Alistar", Ice.ui.backgrounds.url + "Alistar_4.jpg"],
    ["Unchained Alistar", Ice.ui.backgrounds.url + "Alistar_5.jpg"],
    ["Infernal Alistar", Ice.ui.backgrounds.url + "Alistar_6.jpg"],
    ["Sweeper Alistar", Ice.ui.backgrounds.url + "Alistar_7.jpg"],
    ["Darius", Ice.ui.backgrounds.url + "Darius_0.jpg"],
    ["Lord Darius", Ice.ui.backgrounds.url + "Darius_1.jpg"],
    ["Bioforge Darius", Ice.ui.backgrounds.url + "Darius_2.jpg"],
    ["Woad King Darius", Ice.ui.backgrounds.url + "Darius_3.jpg"],
    ["Vayne", Ice.ui.backgrounds.url + "Vayne_0.jpg"],
    ["Vindicator Vayne", Ice.ui.backgrounds.url + "Vayne_1.jpg"],
    ["Aristocrat Vayne", Ice.ui.backgrounds.url + "Vayne_2.jpg"],
    ["Dragonslayer Vayne", Ice.ui.backgrounds.url + "Vayne_3.jpg"],
    ["Heartseeker Vayne", Ice.ui.backgrounds.url + "Vayne_4.jpg"],
    ["SKT T1 Vayne", Ice.ui.backgrounds.url + "Vayne_5.jpg"],
    ["Varus", Ice.ui.backgrounds.url + "Varus_0.jpg"],
    ["Blight Crystal Varus", Ice.ui.backgrounds.url + "Varus_1.jpg"],
    ["Arclight Varus", Ice.ui.backgrounds.url + "Varus_2.jpg"],
    ["Arctic Ops Varus", Ice.ui.backgrounds.url + "Varus_3.jpg"],
    ["Udyr", Ice.ui.backgrounds.url + "Udyr_0.jpg"],
    ["Black Belt Udyr", Ice.ui.backgrounds.url + "Udyr_1.jpg"],
    ["Primal Udyr", Ice.ui.backgrounds.url + "Udyr_2.jpg"],
    ["Spirit Guard Udyr", Ice.ui.backgrounds.url + "Udyr_3.jpg"],
    ["Jayce", Ice.ui.backgrounds.url + "Jayce_0.jpg"],
    ["Full Metal Jayce", Ice.ui.backgrounds.url + "Jayce_1.jpg"],
    ["Debonair Jayce", Ice.ui.backgrounds.url + "Jayce_2.jpg"],
    ["Leona", Ice.ui.backgrounds.url + "Leona_0.jpg"],
    ["Valkyrie Leona", Ice.ui.backgrounds.url + "Leona_1.jpg"],
    ["Defender Leona", Ice.ui.backgrounds.url + "Leona_2.jpg"],
    ["Iron Solari Leona", Ice.ui.backgrounds.url + "Leona_3.jpg"],
    ["Pool Party Leona", Ice.ui.backgrounds.url + "Leona_4.jpg"],
    ["Syndra", Ice.ui.backgrounds.url + "Syndra_0.jpg"],
    ["Justicar Syndra", Ice.ui.backgrounds.url + "Syndra_1.jpg"],
    ["Atlantean Syndra", Ice.ui.backgrounds.url + "Syndra_2.jpg"],
    ["Pantheon", Ice.ui.backgrounds.url + "Pantheon_0.jpg"],
    ["Myrmidon Pantheon", Ice.ui.backgrounds.url + "Pantheon_1.jpg"],
    ["Ruthless Pantheon", Ice.ui.backgrounds.url + "Pantheon_2.jpg"],
    ["Perseus Pantheon", Ice.ui.backgrounds.url + "Pantheon_3.jpg"],
    ["Full Metal Pantheon", Ice.ui.backgrounds.url + "Pantheon_4.jpg"],
    ["Glaive Warrior Pantheon", Ice.ui.backgrounds.url + "Pantheon_5.jpg"],
    ["Dragonslayer Pantheon", Ice.ui.backgrounds.url + "Pantheon_6.jpg"],
    ["Kha\'Zix", Ice.ui.backgrounds.url + "Khazix_0.jpg"],
    ["Mecha Kha\'Zix", Ice.ui.backgrounds.url + "Khazix_1.jpg"],
    ["Riven", Ice.ui.backgrounds.url + "Riven_0.jpg"],
    ["Redeemed Riven", Ice.ui.backgrounds.url + "Riven_1.jpg"],
    ["Crimson Elite Riven", Ice.ui.backgrounds.url + "Riven_2.jpg"],
    ["Battle Bunny Riven", Ice.ui.backgrounds.url + "Riven_3.jpg"],
    ["Championship Riven", Ice.ui.backgrounds.url + "Riven_4.jpg"],
    ["Dragonblade Riven", Ice.ui.backgrounds.url + "Riven_5.jpg"],
    ["Corki", Ice.ui.backgrounds.url + "Corki_0.jpg"],
    ["UFO Corki", Ice.ui.backgrounds.url + "Corki_1.jpg"],
    ["Ice Toboggan Corki", Ice.ui.backgrounds.url + "Corki_2.jpg"],
    ["Red Baron Corki", Ice.ui.backgrounds.url + "Corki_3.jpg"],
    ["Hot Rod Corki", Ice.ui.backgrounds.url + "Corki_4.jpg"],
    ["Urfrider Corki", Ice.ui.backgrounds.url + "Corki_5.jpg"],
    ["Dragonwing Corki", Ice.ui.backgrounds.url + "Corki_6.jpg"],
    ["Caitlyn", Ice.ui.backgrounds.url + "Caitlyn_0.jpg"],
    ["Resistance Caitlyn", Ice.ui.backgrounds.url + "Caitlyn_1.jpg"],
    ["Sheriff Caitlyn", Ice.ui.backgrounds.url + "Caitlyn_2.jpg"],
    ["Safari Caitlyn", Ice.ui.backgrounds.url + "Caitlyn_3.jpg"],
    ["Arctic Warfare Caitlyn", Ice.ui.backgrounds.url + "Caitlyn_4.jpg"],
    ["Officer Caitlyn", Ice.ui.backgrounds.url + "Caitlyn_5.jpg"],
    ["Nidalee", Ice.ui.backgrounds.url + "Nidalee_0.jpg"],
    ["Snow Bunny Nidalee", Ice.ui.backgrounds.url + "Nidalee_1.jpg"],
    ["Leopard Nidalee", Ice.ui.backgrounds.url + "Nidalee_2.jpg"],
    ["French Maid Nidalee", Ice.ui.backgrounds.url + "Nidalee_3.jpg"],
    ["Pharaoh Nidalee", Ice.ui.backgrounds.url + "Nidalee_4.jpg"],
    ["Bewitching Nidalee", Ice.ui.backgrounds.url + "Nidalee_5.jpg"],
    ["Headhunter Nidalee", Ice.ui.backgrounds.url + "Nidalee_6.jpg"],
    ["Galio", Ice.ui.backgrounds.url + "Galio_0.jpg"],
    ["Enchanted Galio", Ice.ui.backgrounds.url + "Galio_1.jpg"],
    ["Hextech Galio", Ice.ui.backgrounds.url + "Galio_2.jpg"],
    ["Commando Galio", Ice.ui.backgrounds.url + "Galio_3.jpg"],
    ["Gatekeeper Galio", Ice.ui.backgrounds.url + "Galio_4.jpg"],
    ["Kennen", Ice.ui.backgrounds.url + "Kennen_0.jpg"],
    ["Deadly Kennen", Ice.ui.backgrounds.url + "Kennen_1.jpg"],
    ["Swamp Master Kennen", Ice.ui.backgrounds.url + "Kennen_2.jpg"],
    ["Karate Kennen", Ice.ui.backgrounds.url + "Kennen_3.jpg"],
    ["Kennen M.D.", Ice.ui.backgrounds.url + "Kennen_4.jpg"],
    ["Arctic Ops Kennen", Ice.ui.backgrounds.url + "Kennen_5.jpg"],
    ["Veigar", Ice.ui.backgrounds.url + "Veigar_0.jpg"],
    ["White Mage Veigar", Ice.ui.backgrounds.url + "Veigar_1.jpg"],
    ["Curling Veigar", Ice.ui.backgrounds.url + "Veigar_2.jpg"],
    ["Veigar Greybeard", Ice.ui.backgrounds.url + "Veigar_3.jpg"],
    ["Leprechaun Veigar", Ice.ui.backgrounds.url + "Veigar_4.jpg"],
    ["Baron Von Veigar", Ice.ui.backgrounds.url + "Veigar_5.jpg"],
    ["Superb Villain Veigar", Ice.ui.backgrounds.url + "Veigar_6.jpg"],
    ["Bad Santa Veigar", Ice.ui.backgrounds.url + "Veigar_7.jpg"],
    ["Graves", Ice.ui.backgrounds.url + "Graves_0.jpg"],
    ["Hired Gun Graves", Ice.ui.backgrounds.url + "Graves_1.jpg"],
    ["Jailbreak Graves", Ice.ui.backgrounds.url + "Graves_2.jpg"],
    ["Mafia Graves", Ice.ui.backgrounds.url + "Graves_3.jpg"],
    ["Riot Graves", Ice.ui.backgrounds.url + "Graves_4.jpg"],
    ["Pool Party Graves", Ice.ui.backgrounds.url + "Graves_5.jpg"],
    ["Malzahar", Ice.ui.backgrounds.url + "Malzahar_0.jpg"],
    ["Vizier Malzahar", Ice.ui.backgrounds.url + "Malzahar_1.jpg"],
    ["Shadow Prince Malzahar", Ice.ui.backgrounds.url + "Malzahar_2.jpg"],
    ["Djinn Malzahar", Ice.ui.backgrounds.url + "Malzahar_3.jpg"],
    ["Overlord Malzahar", Ice.ui.backgrounds.url + "Malzahar_4.jpg"],
    ["Vi", Ice.ui.backgrounds.url + "Vi_0.jpg"],
    ["Neon Strike Vi", Ice.ui.backgrounds.url + "Vi_1.jpg"],
    ["Officer Vi", Ice.ui.backgrounds.url + "Vi_2.jpg"],
    ["Kayle", Ice.ui.backgrounds.url + "Kayle_0.jpg"],
    ["Silver Kayle", Ice.ui.backgrounds.url + "Kayle_1.jpg"],
    ["Viridian Kayle", Ice.ui.backgrounds.url + "Kayle_2.jpg"],
    ["Unmasked Kayle", Ice.ui.backgrounds.url + "Kayle_3.jpg"],
    ["Battleborn Kayle", Ice.ui.backgrounds.url + "Kayle_4.jpg"],
    ["Judgment Kayle", Ice.ui.backgrounds.url + "Kayle_5.jpg"],
    ["Aether Wing Kayle", Ice.ui.backgrounds.url + "Kayle_6.jpg"],
    ["Irelia", Ice.ui.backgrounds.url + "Irelia_0.jpg"],
    ["Nightblade Irelia", Ice.ui.backgrounds.url + "Irelia_1.jpg"],
    ["Aviator Irelia", Ice.ui.backgrounds.url + "Irelia_2.jpg"],
    ["Infiltrator Irelia", Ice.ui.backgrounds.url + "Irelia_3.jpg"],
    ["Frostblade Irelia", Ice.ui.backgrounds.url + "Irelia_4.jpg"],
    ["Lee Sin", Ice.ui.backgrounds.url + "LeeSin_0.jpg"],
    ["Traditional Lee Sin", Ice.ui.backgrounds.url + "LeeSin_1.jpg"],
    ["Acolyte Lee Sin", Ice.ui.backgrounds.url + "LeeSin_2.jpg"],
    ["Dragon Fist Lee Sin", Ice.ui.backgrounds.url + "LeeSin_3.jpg"],
    ["Muay Thai Lee Sin", Ice.ui.backgrounds.url + "LeeSin_4.jpg"],
    ["Pool Party Lee Sin", Ice.ui.backgrounds.url + "LeeSin_5.jpg"],
    ["SKT T1 Lee Sin", Ice.ui.backgrounds.url + "LeeSin_6.jpg"],
    ["Elise", Ice.ui.backgrounds.url + "Elise_0.jpg"],
    ["Death Blossom Elise", Ice.ui.backgrounds.url + "Elise_1.jpg"],
    ["Victorious Elise", Ice.ui.backgrounds.url + "Elise_2.jpg"],
    ["Volibear", Ice.ui.backgrounds.url + "Volibear_0.jpg"],
    ["Thunder Lord Volibear", Ice.ui.backgrounds.url + "Volibear_1.jpg"],
    ["Northern Storm Volibear", Ice.ui.backgrounds.url + "Volibear_2.jpg"],
    ["Runeguard Volibear", Ice.ui.backgrounds.url + "Volibear_3.jpg"],
    ["Nunu", Ice.ui.backgrounds.url + "Nunu_0.jpg"],
    ["Sasquatch Nunu", Ice.ui.backgrounds.url + "Nunu_1.jpg"],
    ["Workshop Nunu", Ice.ui.backgrounds.url + "Nunu_2.jpg"],
    ["Grungy Nunu", Ice.ui.backgrounds.url + "Nunu_3.jpg"],
    ["Nunu Bot", Ice.ui.backgrounds.url + "Nunu_4.jpg"],
    ["Demolisher Nunu", Ice.ui.backgrounds.url + "Nunu_5.jpg"],
    ["TPA Nunu", Ice.ui.backgrounds.url + "Nunu_6.jpg"],
    ["Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_0.jpg"],
    ["PAX Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_1.jpg"],
    ["Jack of Hearts Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_2.jpg"],
    ["The Magnificent Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_3.jpg"],
    ["Tango Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_4.jpg"],
    ["High Noon Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_5.jpg"],
    ["Musketeer Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_6.jpg"],
    ["Underworld Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_7.jpg"],
    ["Red Card Twisted Fate", Ice.ui.backgrounds.url + "TwistedFate_8.jpg"],
    ["Jax", Ice.ui.backgrounds.url + "Jax_0.jpg"],
    ["The Mighty Jax", Ice.ui.backgrounds.url + "Jax_1.jpg"],
    ["Vandal Jax", Ice.ui.backgrounds.url + "Jax_2.jpg"],
    ["Angler Jax", Ice.ui.backgrounds.url + "Jax_3.jpg"],
    ["PAX Jax", Ice.ui.backgrounds.url + "Jax_4.jpg"],
    ["Jaximus", Ice.ui.backgrounds.url + "Jax_5.jpg"],
    ["Temple Jax", Ice.ui.backgrounds.url + "Jax_6.jpg"],
    ["Nemesis Jax", Ice.ui.backgrounds.url + "Jax_7.jpg"],
    ["SKT T1 Jax", Ice.ui.backgrounds.url + "Jax_8.jpg"],
    ["Shyvana", Ice.ui.backgrounds.url + "Shyvana_0.jpg"],
    ["Ironscale Shyvana", Ice.ui.backgrounds.url + "Shyvana_1.jpg"],
    ["Boneclaw Shyvana", Ice.ui.backgrounds.url + "Shyvana_2.jpg"],
    ["Darkflame Shyvana", Ice.ui.backgrounds.url + "Shyvana_3.jpg"],
    ["Ice Drake Shyvana", Ice.ui.backgrounds.url + "Shyvana_4.jpg"],
    ["Dr. Mundo", Ice.ui.backgrounds.url + "DrMundo_0.jpg"],
    ["Toxic Dr. Mundo", Ice.ui.backgrounds.url + "DrMundo_1.jpg"],
    ["Mr. Mundoverse", Ice.ui.backgrounds.url + "DrMundo_2.jpg"],
    ["Corporate Mundo", Ice.ui.backgrounds.url + "DrMundo_3.jpg"],
    ["Mundo Mundo", Ice.ui.backgrounds.url + "DrMundo_4.jpg"],
    ["Executioner Mundo", Ice.ui.backgrounds.url + "DrMundo_5.jpg"],
    ["Rageborn Mundo", Ice.ui.backgrounds.url + "DrMundo_6.jpg"],
    ["TPA Mundo", Ice.ui.backgrounds.url + "DrMundo_7.jpg"],
    ["Brand", Ice.ui.backgrounds.url + "Brand_0.jpg"],
    ["Apocalyptic Brand", Ice.ui.backgrounds.url + "Brand_1.jpg"],
    ["Vandal Brand", Ice.ui.backgrounds.url + "Brand_2.jpg"],
    ["Cryocore Brand", Ice.ui.backgrounds.url + "Brand_3.jpg"],
    ["Zombie Brand", Ice.ui.backgrounds.url + "Brand_4.jpg"],
    ["Diana", Ice.ui.backgrounds.url + "Diana_0.jpg"],
    ["Dark Valkyrie Diana", Ice.ui.backgrounds.url + "Diana_1.jpg"],
    ["Lunar Goddess Diana", Ice.ui.backgrounds.url + "Diana_2.jpg"],
    ["Sejuani", Ice.ui.backgrounds.url + "Sejuani_0.jpg"],
    ["Sabretusk Sejuani", Ice.ui.backgrounds.url + "Sejuani_1.jpg"],
    ["Darkrider Sejuani", Ice.ui.backgrounds.url + "Sejuani_2.jpg"],
    ["Traditional Sejuani", Ice.ui.backgrounds.url + "Sejuani_3.jpg"],
    ["Bear Cavalry Sejuani", Ice.ui.backgrounds.url + "Sejuani_4.jpg"],
    ["Vladimir", Ice.ui.backgrounds.url + "Vladimir_0.jpg"],
    ["Count Vladimir", Ice.ui.backgrounds.url + "Vladimir_1.jpg"],
    ["Marquis Vladimir", Ice.ui.backgrounds.url + "Vladimir_2.jpg"],
    ["Nosferatu Vladimir", Ice.ui.backgrounds.url + "Vladimir_3.jpg"],
    ["Vandal Vladimir", Ice.ui.backgrounds.url + "Vladimir_4.jpg"],
    ["Blood Lord Vladimir", Ice.ui.backgrounds.url + "Vladimir_5.jpg"],
    ["Zac", Ice.ui.backgrounds.url + "Zac_0.jpg"],
    ["Special Weapon Zac", Ice.ui.backgrounds.url + "Zac_1.jpg"],
    ["Quinn", Ice.ui.backgrounds.url + "Quinn_0.jpg"],
    ["Phoenix Quinn", Ice.ui.backgrounds.url + "Quinn_1.jpg"],
    ["Woad Scout Quinn", Ice.ui.backgrounds.url + "Quinn_2.jpg"],
    ["Akali", Ice.ui.backgrounds.url + "Akali_0.jpg"],
    ["Stinger Akali", Ice.ui.backgrounds.url + "Akali_1.jpg"],
    ["Crimson Akali", Ice.ui.backgrounds.url + "Akali_2.jpg"],
    ["All-star Akali", Ice.ui.backgrounds.url + "Akali_3.jpg"],
    ["Nurse Akali", Ice.ui.backgrounds.url + "Akali_4.jpg"],
    ["Blood Moon Akali", Ice.ui.backgrounds.url + "Akali_5.jpg"],
    ["Silverfang Akali", Ice.ui.backgrounds.url + "Akali_6.jpg"],
    ["Tristana", Ice.ui.backgrounds.url + "Tristana_0.jpg"],
    ["Riot Girl Tristana", Ice.ui.backgrounds.url + "Tristana_1.jpg"],
    ["Earnest Elf Tristana", Ice.ui.backgrounds.url + "Tristana_2.jpg"],
    ["Firefighter Tristana", Ice.ui.backgrounds.url + "Tristana_3.jpg"],
    ["Guerilla Tristana", Ice.ui.backgrounds.url + "Tristana_4.jpg"],
    ["Buccaneer Tristana", Ice.ui.backgrounds.url + "Tristana_5.jpg"],
    ["Rocket Girl Tristana", Ice.ui.backgrounds.url + "Tristana_6.jpg"],
    ["Hecarim", Ice.ui.backgrounds.url + "Hecarim_0.jpg"],
    ["Blood Knight Hecarim", Ice.ui.backgrounds.url + "Hecarim_1.jpg"],
    ["Reaper Hecarim", Ice.ui.backgrounds.url + "Hecarim_2.jpg"],
    ["Headless Hecarim", Ice.ui.backgrounds.url + "Hecarim_3.jpg"],
    ["Arcade Hecarim", Ice.ui.backgrounds.url + "Hecarim_4.jpg"],
    ["Sivir", Ice.ui.backgrounds.url + "Sivir_0.jpg"],
    ["Warrior Princess Sivir", Ice.ui.backgrounds.url + "Sivir_1.jpg"],
    ["Spectacular Sivir", Ice.ui.backgrounds.url + "Sivir_2.jpg"],
    ["Huntress Sivir", Ice.ui.backgrounds.url + "Sivir_3.jpg"],
    ["Bandit Sivir", Ice.ui.backgrounds.url + "Sivir_4.jpg"],
    ["PAX Sivir", Ice.ui.backgrounds.url + "Sivir_5.jpg"],
    ["Snowstorm Sivir", Ice.ui.backgrounds.url + "Sivir_6.jpg"],
    ["Lucian", Ice.ui.backgrounds.url + "Lucian_0.jpg"],
    ["Hired Gun Lucian", Ice.ui.backgrounds.url + "Lucian_1.jpg"],
    ["Striker Lucian", Ice.ui.backgrounds.url + "Lucian_2.jpg"],
    ["Rengar", Ice.ui.backgrounds.url + "Rengar_0.jpg"],
    ["Headhunter Rengar", Ice.ui.backgrounds.url + "Rengar_1.jpg"],
    ["Night Hunter Rengar", Ice.ui.backgrounds.url + "Rengar_2.jpg"],
    ["Warwick", Ice.ui.backgrounds.url + "Warwick_0.jpg"],
    ["Grey Warwick", Ice.ui.backgrounds.url + "Warwick_1.jpg"],
    ["Urf the Manatee", Ice.ui.backgrounds.url + "Warwick_2.jpg"],
    ["Big Bad Warwick", Ice.ui.backgrounds.url + "Warwick_3.jpg"],
    ["Tundra Hunter Warwick", Ice.ui.backgrounds.url + "Warwick_4.jpg"],
    ["Feral Warwick", Ice.ui.backgrounds.url + "Warwick_5.jpg"],
    ["Firefang Warwick", Ice.ui.backgrounds.url + "Warwick_6.jpg"],
    ["Hyena Warwick", Ice.ui.backgrounds.url + "Warwick_7.jpg"],
    ["Skarner", Ice.ui.backgrounds.url + "Skarner_0.jpg"],
    ["Sandscourge Skarner", Ice.ui.backgrounds.url + "Skarner_1.jpg"],
    ["Earthrune Skarner", Ice.ui.backgrounds.url + "Skarner_2.jpg"],
    ["Malphite", Ice.ui.backgrounds.url + "Malphite_0.jpg"],
    ["Shamrock Malphite", Ice.ui.backgrounds.url + "Malphite_1.jpg"],
    ["Coral Reef Malphite", Ice.ui.backgrounds.url + "Malphite_2.jpg"],
    ["Marble Malphite", Ice.ui.backgrounds.url + "Malphite_3.jpg"],
    ["Obsidian Malphite", Ice.ui.backgrounds.url + "Malphite_4.jpg"],
    ["Glacial Malphite", Ice.ui.backgrounds.url + "Malphite_5.jpg"],
    ["Yasuo", Ice.ui.backgrounds.url + "Yasuo_0.jpg"],
    ["High Noon Yasuo", Ice.ui.backgrounds.url + "Yasuo_1.jpg"],
    ["Xerath", Ice.ui.backgrounds.url + "Xerath_0.jpg"],
    ["Runeborn Xerath", Ice.ui.backgrounds.url + "Xerath_1.jpg"],
    ["Battlecast Xerath", Ice.ui.backgrounds.url + "Xerath_2.jpg"],
    ["Scorched Earth Xerath", Ice.ui.backgrounds.url + "Xerath_3.jpg"],
    ["Teemo", Ice.ui.backgrounds.url + "Teemo_0.jpg"],
    ["Happy Elf Teemo", Ice.ui.backgrounds.url + "Teemo_1.jpg"],
    ["Recon Teemo", Ice.ui.backgrounds.url + "Teemo_2.jpg"],
    ["Badger Teemo", Ice.ui.backgrounds.url + "Teemo_3.jpg"],
    ["Astronaut Teemo", Ice.ui.backgrounds.url + "Teemo_4.jpg"],
    ["Cottontail Teemo", Ice.ui.backgrounds.url + "Teemo_5.jpg"],
    ["Super Teemo", Ice.ui.backgrounds.url + "Teemo_6.jpg"],
    ["Panda Teemo", Ice.ui.backgrounds.url + "Teemo_7.jpg"],
    ["Nasus", Ice.ui.backgrounds.url + "Nasus_0.jpg"],
    ["Galactic Nasus", Ice.ui.backgrounds.url + "Nasus_1.jpg"],
    ["Pharaoh Nasus", Ice.ui.backgrounds.url + "Nasus_2.jpg"],
    ["Dreadknight Nasus", Ice.ui.backgrounds.url + "Nasus_3.jpg"],
    ["Riot K-9 Nasus", Ice.ui.backgrounds.url + "Nasus_4.jpg"],
    ["Infernal Nasus", Ice.ui.backgrounds.url + "Nasus_5.jpg"],
    ["Renekton", Ice.ui.backgrounds.url + "Renekton_0.jpg"],
    ["Galactic Renekton", Ice.ui.backgrounds.url + "Renekton_1.jpg"],
    ["Outback Renekton", Ice.ui.backgrounds.url + "Renekton_2.jpg"],
    ["Bloodfury Renekton", Ice.ui.backgrounds.url + "Renekton_3.jpg"],
    ["Rune Wars Renekton", Ice.ui.backgrounds.url + "Renekton_4.jpg"],
    ["Scorched Earth Renekton", Ice.ui.backgrounds.url + "Renekton_5.jpg"],
    ["Pool Party Renekton", Ice.ui.backgrounds.url + "Renekton_6.jpg"],
    ["Draven", Ice.ui.backgrounds.url + "Draven_0.jpg"],
    ["Soul Reaver Draven", Ice.ui.backgrounds.url + "Draven_1.jpg"],
    ["Gladiator Draven", Ice.ui.backgrounds.url + "Draven_2.jpg"],
    ["Primetime Draven", Ice.ui.backgrounds.url + "Draven_3.jpg"],
    ["Shaco", Ice.ui.backgrounds.url + "Shaco_0.jpg"],
    ["Mad Hatter Shaco", Ice.ui.backgrounds.url + "Shaco_1.jpg"],
    ["Royal Shaco", Ice.ui.backgrounds.url + "Shaco_2.jpg"],
    ["Nutcracko", Ice.ui.backgrounds.url + "Shaco_3.jpg"],
    ["Workshop Shaco", Ice.ui.backgrounds.url + "Shaco_4.jpg"],
    ["Asylum Shaco", Ice.ui.backgrounds.url + "Shaco_5.jpg"],
    ["Masked Shaco", Ice.ui.backgrounds.url + "Shaco_6.jpg"],
    ["Swain", Ice.ui.backgrounds.url + "Swain_0.jpg"],
    ["Northern Front Swain", Ice.ui.backgrounds.url + "Swain_1.jpg"],
    ["Bilgewater Swain", Ice.ui.backgrounds.url + "Swain_2.jpg"],
    ["Tyrant Swain", Ice.ui.backgrounds.url + "Swain_3.jpg"],
    ["Ziggs", Ice.ui.backgrounds.url + "Ziggs_0.jpg"],
    ["Mad Scientist Ziggs", Ice.ui.backgrounds.url + "Ziggs_1.jpg"],
    ["Major Ziggs", Ice.ui.backgrounds.url + "Ziggs_2.jpg"],
    ["Pool Party Ziggs", Ice.ui.backgrounds.url + "Ziggs_3.jpg"],
    ["Snow Day Ziggs", Ice.ui.backgrounds.url + "Ziggs_4.jpg"],
    ["Janna", Ice.ui.backgrounds.url + "Janna_0.jpg"],
    ["Tempest Janna", Ice.ui.backgrounds.url + "Janna_1.jpg"],
    ["Hextech Janna", Ice.ui.backgrounds.url + "Janna_2.jpg"],
    ["Frost Queen Janna", Ice.ui.backgrounds.url + "Janna_3.jpg"],
    ["Victorious Janna", Ice.ui.backgrounds.url + "Janna_4.jpg"],
    ["Forecast Janna", Ice.ui.backgrounds.url + "Janna_5.jpg"],
    ["Talon", Ice.ui.backgrounds.url + "Talon_0.jpg"],
    ["Renegade Talon", Ice.ui.backgrounds.url + "Talon_1.jpg"],
    ["Crimson Elite Talon", Ice.ui.backgrounds.url + "Talon_2.jpg"],
    ["Dragonblade Talon", Ice.ui.backgrounds.url + "Talon_3.jpg"],
    ["Orianna", Ice.ui.backgrounds.url + "Orianna_0.jpg"],
    ["Gothic Orianna", Ice.ui.backgrounds.url + "Orianna_1.jpg"],
    ["Sewn Chaos Orianna", Ice.ui.backgrounds.url + "Orianna_2.jpg"],
    ["Bladecraft Orianna", Ice.ui.backgrounds.url + "Orianna_3.jpg"],
    ["TPA Orianna", Ice.ui.backgrounds.url + "Orianna_4.jpg"],
    ["Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_0.jpg"],
    ["Spectral Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_1.jpg"],
    ["Union Jack Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_2.jpg"],
    ["Bandito Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_3.jpg"],
    ["Pumpkinhead Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_4.jpg"],
    ["Fiddle Me Timbers", Ice.ui.backgrounds.url + "FiddleSticks_5.jpg"],
    ["Surprise Party Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_6.jpg"],
    ["Dark Candy Fiddlesticks", Ice.ui.backgrounds.url + "FiddleSticks_7.jpg"],
    ["Fiora", Ice.ui.backgrounds.url + "Fiora_0.jpg"],
    ["Royal Guard Fiora", Ice.ui.backgrounds.url + "Fiora_1.jpg"],
    ["Nightraven Fiora", Ice.ui.backgrounds.url + "Fiora_2.jpg"],
    ["Headmistress Fiora", Ice.ui.backgrounds.url + "Fiora_3.jpg"],
    ["Cho\'Gath", Ice.ui.backgrounds.url + "Chogath_0.jpg"],
    ["Nightmare Cho\'Gath", Ice.ui.backgrounds.url + "Chogath_1.jpg"],
    ["Gentleman Cho\'Gath", Ice.ui.backgrounds.url + "Chogath_2.jpg"],
    ["Loch Ness Cho\'Gath", Ice.ui.backgrounds.url + "Chogath_3.jpg"],
    ["Jurassic Cho\'Gath", Ice.ui.backgrounds.url + "Chogath_4.jpg"],
    ["Battlecast Prime Cho\'Gath", Ice.ui.backgrounds.url + "Chogath_5.jpg"],
    ["Rammus", Ice.ui.backgrounds.url + "Rammus_0.jpg"],
    ["King Rammus", Ice.ui.backgrounds.url + "Rammus_1.jpg"],
    ["Chrome Rammus", Ice.ui.backgrounds.url + "Rammus_2.jpg"],
    ["Molten Rammus", Ice.ui.backgrounds.url + "Rammus_3.jpg"],
    ["Freljord Rammus", Ice.ui.backgrounds.url + "Rammus_4.jpg"],
    ["Ninja Rammus", Ice.ui.backgrounds.url + "Rammus_5.jpg"],
    ["Full Metal Rammus", Ice.ui.backgrounds.url + "Rammus_6.jpg"],
    ["LeBlanc", Ice.ui.backgrounds.url + "Leblanc_0.jpg"],
    ["Wicked LeBlanc", Ice.ui.backgrounds.url + "Leblanc_1.jpg"],
    ["Prestigious LeBlanc", Ice.ui.backgrounds.url + "Leblanc_2.jpg"],
    ["Mistletoe LeBlanc", Ice.ui.backgrounds.url + "Leblanc_3.jpg"],
    ["Zilean", Ice.ui.backgrounds.url + "Zilean_0.jpg"],
    ["Old Saint Zilean", Ice.ui.backgrounds.url + "Zilean_1.jpg"],
    ["Groovy Zilean", Ice.ui.backgrounds.url + "Zilean_2.jpg"],
    ["Shurima Desert Zilean", Ice.ui.backgrounds.url + "Zilean_3.jpg"],
    ["Time Machine Zilean", Ice.ui.backgrounds.url + "Zilean_4.jpg"],
    ["Soraka", Ice.ui.backgrounds.url + "Soraka_0.jpg"],
    ["Dryad Soraka", Ice.ui.backgrounds.url + "Soraka_1.jpg"],
    ["Divine Soraka", Ice.ui.backgrounds.url + "Soraka_2.jpg"],
    ["Celestine Soraka", Ice.ui.backgrounds.url + "Soraka_3.jpg"],
    ["Nocturne", Ice.ui.backgrounds.url + "Nocturne_0.jpg"],
    ["Frozen Terror Nocturne", Ice.ui.backgrounds.url + "Nocturne_1.jpg"],
    ["Void Nocturne", Ice.ui.backgrounds.url + "Nocturne_2.jpg"],
    ["Ravager Nocturne", Ice.ui.backgrounds.url + "Nocturne_3.jpg"],
    ["Haunting Nocturne", Ice.ui.backgrounds.url + "Nocturne_4.jpg"],
    ["Eternum Nocturne", Ice.ui.backgrounds.url + "Nocturne_5.jpg"],
    ["Jinx", Ice.ui.backgrounds.url + "Jinx_0.jpg"],
    ["Mafia Jinx", Ice.ui.backgrounds.url + "Jinx_1.jpg"],
    ["Yorick", Ice.ui.backgrounds.url + "Yorick_0.jpg"],
    ["Undertaker Yorick", Ice.ui.backgrounds.url + "Yorick_1.jpg"],
    ["Pentakill Yorick", Ice.ui.backgrounds.url + "Yorick_2.jpg"],
    ["Urgot", Ice.ui.backgrounds.url + "Urgot_0.jpg"],
    ["Giant Enemy Crabgot", Ice.ui.backgrounds.url + "Urgot_1.jpg"],
    ["Butcher Urgot", Ice.ui.backgrounds.url + "Urgot_2.jpg"],
    ["Battlecast Urgot", Ice.ui.backgrounds.url + "Urgot_3.jpg"],
    ["Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_0.jpg"],
    ["Cowgirl Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_1.jpg"],
    ["Waterloo Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_2.jpg"],
    ["Secret Agent Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_3.jpg"],
    ["Candy Cane Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_4.jpg"],
    ["Road Warrior Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_5.jpg"],
    ["Mafia Miss Fortune", Ice.ui.backgrounds.url + "MissFortune_6.jpg"],
    ["Wukong", Ice.ui.backgrounds.url + "MonkeyKing_0.jpg"],
    ["Volcanic Wukong", Ice.ui.backgrounds.url + "MonkeyKing_1.jpg"],
    ["General Wukong", Ice.ui.backgrounds.url + "MonkeyKing_2.jpg"],
    ["Jade Dragon Wukong", Ice.ui.backgrounds.url + "MonkeyKing_3.jpg"],
    ["Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_0.jpg"],
    ["Rusty Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_1.jpg"],
    ["Goalkeeper Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_2.jpg"],
    ["Boom Boom Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_3.jpg"],
    ["Piltover Customs Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_4.jpg"],
    ["Definitely Not Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_5.jpg"],
    ["iBlitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_6.jpg"],
    ["Riot Blitzcrank", Ice.ui.backgrounds.url + "Blitzcrank_7.jpg"],
    ["Shen", Ice.ui.backgrounds.url + "Shen_0.jpg"],
    ["Frozen Shen", Ice.ui.backgrounds.url + "Shen_1.jpg"],
    ["Yellow Jacket Shen", Ice.ui.backgrounds.url + "Shen_2.jpg"],
    ["Surgeon Shen", Ice.ui.backgrounds.url + "Shen_3.jpg"],
    ["Blood Moon Shen", Ice.ui.backgrounds.url + "Shen_4.jpg"],
    ["Warlord Shen", Ice.ui.backgrounds.url + "Shen_5.jpg"],
    ["TPA Shen", Ice.ui.backgrounds.url + "Shen_6.jpg"],
    ["Braum", Ice.ui.backgrounds.url + "Braum_0.jpg"],
    ["Dragonslayer Braum", Ice.ui.backgrounds.url + "Braum_1.jpg"],
    ["Xin Zhao", Ice.ui.backgrounds.url + "XinZhao_0.jpg"],
    ["Commando Xin Zhao", Ice.ui.backgrounds.url + "XinZhao_1.jpg"],
    ["Imperial Xin Zhao", Ice.ui.backgrounds.url + "XinZhao_2.jpg"],
    ["Viscero Xin Zhao", Ice.ui.backgrounds.url + "XinZhao_3.jpg"],
    ["Winged Hussar Xin Zhao", Ice.ui.backgrounds.url + "XinZhao_4.jpg"],
    ["Warring Kingdoms Xin Zhao", Ice.ui.backgrounds.url + "XinZhao_5.jpg"],
    ["Twitch", Ice.ui.backgrounds.url + "Twitch_0.jpg"],
    ["Kingpin Twitch", Ice.ui.backgrounds.url + "Twitch_1.jpg"],
    ["Whistler Village Twitch", Ice.ui.backgrounds.url + "Twitch_2.jpg"],
    ["Medieval Twitch", Ice.ui.backgrounds.url + "Twitch_3.jpg"],
    ["Gangster Twitch", Ice.ui.backgrounds.url + "Twitch_4.jpg"],
    ["Vandal Twitch", Ice.ui.backgrounds.url + "Twitch_5.jpg"],
    ["Master Yi", Ice.ui.backgrounds.url + "MasterYi_0.jpg"],
    ["Assassin Master Yi", Ice.ui.backgrounds.url + "MasterYi_1.jpg"],
    ["Chosen Master Yi", Ice.ui.backgrounds.url + "MasterYi_2.jpg"],
    ["Ionia Master Yi", Ice.ui.backgrounds.url + "MasterYi_3.jpg"],
    ["Samurai Yi", Ice.ui.backgrounds.url + "MasterYi_4.jpg"],
    ["Headhunter Master Yi", Ice.ui.backgrounds.url + "MasterYi_5.jpg"],
    ["Taric", Ice.ui.backgrounds.url + "Taric_0.jpg"],
    ["Emerald Taric", Ice.ui.backgrounds.url + "Taric_1.jpg"],
    ["Armor of the Fifth Age Taric", Ice.ui.backgrounds.url + "Taric_2.jpg"],
    ["Bloodstone Taric", Ice.ui.backgrounds.url + "Taric_3.jpg"],
    ["Amumu", Ice.ui.backgrounds.url + "Amumu_0.jpg"],
    ["Pharaoh Amumu", Ice.ui.backgrounds.url + "Amumu_1.jpg"],
    ["Vancouver Amumu", Ice.ui.backgrounds.url + "Amumu_2.jpg"],
    ["Emumu", Ice.ui.backgrounds.url + "Amumu_3.jpg"],
    ["Re-Gifted Amumu", Ice.ui.backgrounds.url + "Amumu_4.jpg"],
    ["Almost-Prom King Amumu", Ice.ui.backgrounds.url + "Amumu_5.jpg"],
    ["Little Knight Amumu", Ice.ui.backgrounds.url + "Amumu_6.jpg"],
    ["Sad Robot Amumu", Ice.ui.backgrounds.url + "Amumu_7.jpg"],
    ["Gangplank", Ice.ui.backgrounds.url + "Gangplank_0.jpg"],
    ["Spooky Gangplank", Ice.ui.backgrounds.url + "Gangplank_1.jpg"],
    ["Minuteman Gangplank", Ice.ui.backgrounds.url + "Gangplank_2.jpg"],
    ["Sailor Gangplank", Ice.ui.backgrounds.url + "Gangplank_3.jpg"],
    ["Toy Soldier Gangplank", Ice.ui.backgrounds.url + "Gangplank_4.jpg"],
    ["Special Forces Gangplank", Ice.ui.backgrounds.url + "Gangplank_5.jpg"],
    ["Sultan Gangplank", Ice.ui.backgrounds.url + "Gangplank_6.jpg"],
    ["Trundle", Ice.ui.backgrounds.url + "Trundle_0.jpg"],
    ["Lil\' Slugger Trundle", Ice.ui.backgrounds.url + "Trundle_1.jpg"],
    ["Junkyard Trundle", Ice.ui.backgrounds.url + "Trundle_2.jpg"],
    ["Traditional Trundle", Ice.ui.backgrounds.url + "Trundle_3.jpg"],
    ["Kassadin", Ice.ui.backgrounds.url + "Kassadin_0.jpg"],
    ["Festival Kassadin", Ice.ui.backgrounds.url + "Kassadin_1.jpg"],
    ["Deep One Kassadin", Ice.ui.backgrounds.url + "Kassadin_2.jpg"],
    ["Pre-Void Kassadin", Ice.ui.backgrounds.url + "Kassadin_3.jpg"],
    ["Harbinger Kassadin", Ice.ui.backgrounds.url + "Kassadin_4.jpg"],
    ["Vel\'Koz", Ice.ui.backgrounds.url + "Velkoz_0.jpg"],
    ["Battlecast Vel\'Koz", Ice.ui.backgrounds.url + "Velkoz_1.jpg"],
    ["Zyra", Ice.ui.backgrounds.url + "Zyra_0.jpg"],
    ["Wildfire Zyra", Ice.ui.backgrounds.url + "Zyra_1.jpg"],
    ["Haunted Zyra", Ice.ui.backgrounds.url + "Zyra_2.jpg"],
    ["SKT T1 Zyra", Ice.ui.backgrounds.url + "Zyra_3.jpg"],
    ["Nami", Ice.ui.backgrounds.url + "Nami_0.jpg"],
    ["Koi Nami", Ice.ui.backgrounds.url + "Nami_1.jpg"],
    ["River Spirit Nami", Ice.ui.backgrounds.url + "Nami_2.jpg"],
    ["Jarvan IV", Ice.ui.backgrounds.url + "JarvanIV_0.jpg"],
    ["Commando Jarvan IV", Ice.ui.backgrounds.url + "JarvanIV_1.jpg"],
    ["Dragonslayer Jarvan IV", Ice.ui.backgrounds.url + "JarvanIV_2.jpg"],
    ["Darkforge Jarvan IV", Ice.ui.backgrounds.url + "JarvanIV_3.jpg"],
    ["Victorious Jarvan IV", Ice.ui.backgrounds.url + "JarvanIV_4.jpg"],
    ["Warring Kingdoms Jarvan IV", Ice.ui.backgrounds.url + "JarvanIV_5.jpg"],
    ["Ezreal", Ice.ui.backgrounds.url + "Ezreal_0.jpg"],
    ["Nottingham Ezreal", Ice.ui.backgrounds.url + "Ezreal_1.jpg"],
    ["Striker Ezreal", Ice.ui.backgrounds.url + "Ezreal_2.jpg"],
    ["Frosted Ezreal", Ice.ui.backgrounds.url + "Ezreal_3.jpg"],
    ["Explorer Ezreal", Ice.ui.backgrounds.url + "Ezreal_4.jpg"],
    ["Pulsefire Ezreal", Ice.ui.backgrounds.url + "Ezreal_5.jpg"],
    ["TPA Ezreal", Ice.ui.backgrounds.url + "Ezreal_6.jpg"]
];