Ice.ui.settings = {
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