(function ($) {
    Drupal.behaviors.customEaTb = {
        attach: function (context, settings) {
            var tagElement = $('<a class="custom-eatb-tag" href="#">' + '</a>');
            $('.form-type-custom-eatb-autocomplete-tags-combine', context).once('custom-autocomplete-tags-combine', function () {
                var thisSelector = $(this);
                var thisTagsList = $('.custom-eatb-tags-wr', thisSelector);
                var thisTextField = $('.custom-eatb-textfield', thisSelector);
                var thisTextFieldSingle = $('.custom-eatb-textfield-single', thisSelector);
                var thisCounter = $('.custom-eatb-counter-wr span', thisSelector);

                function customWidgetEatTagClick(thisTextFieldIn, thisIn) {
                    thisTextFieldIn.val(thisTextField.val().replace(thisIn.text() + ', ', ''));
                    thisTextFieldIn.val(thisTextField.val().replace(thisIn.text() + ',', ''));
                    thisTextFieldIn.val(thisTextField.val().replace(thisIn.text(), ''));
                    thisIn.remove();
                    thisCounter.text($('a', thisTagsList).length);
                };

                //remove
                $('.custom-eatb-tag').bind('click', function () {
                    customWidgetEatTagClick(thisTextField, $(this));
                    return false;
                });

                //add
                thisTextFieldSingle.bind('autocompleteSelect', function () {
                    var thisTag = thisTextFieldSingle.val();
                    var thisTextFieldVal = thisTextField.val();
                    thisTextFieldSingle.val('');
                    console.log(thisTextFieldVal.indexOf(thisTag));
                    if (thisTag != undefined && thisTag != '') {
                        if (thisTextFieldVal.indexOf(thisTag) == -1) {
                            if (thisTextFieldVal != '') {
                                thisTextField.val(thisTextField.val() + (', ' + thisTag));
                            } else {
                                thisTextField.val(thisTextField.val() + thisTag);
                            }
                            var newTagElement = tagElement.clone().text(thisTag).bind('click', function () {
                                customWidgetEatTagClick(thisTextField, $(this));
                                return false;
                            });
                            thisTagsList.append(newTagElement);
                            thisCounter.text($('a', thisTagsList).length);
                        } else {
                            console.log('Has already');
                        }
                    }
                });
            });
        }
    };
})
(jQuery);