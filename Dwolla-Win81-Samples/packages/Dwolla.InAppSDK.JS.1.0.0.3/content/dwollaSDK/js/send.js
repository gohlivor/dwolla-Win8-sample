(function () {
    "use strict";

    var isSearching = false;

    var page = WinJS.UI.Pages.define("/DwollaSDK/pages/send.html", {
        ready: function (element, options) {
            var el = $('section[role="main"]');

            var toavatar = el.find('#to_avatar_placeholder'),
                toid = el.find('#toid'),
                toname = el.find('#toname'),
                amount = el.find('#amount'),
                source = el.find('#source'),
                pin = el.find('#pin'),
                next = el.find('#next'),
                balance = el.find('#balance');

            $('#amount').text(DwollaAPIHelpers.currencyFormat(DwollaAPIHelpers.parseMoney(DwollaAPI.getAmount())));
            DwollaAPI.getMerchantAccount().then(
                function (response) {
                    $('#toid').text(response.id);
                    $('#toname').text(response.name);
                    $('#to_avatar_placeholder').attr("src", response.avatar);
                });
            DwollaAPI.getBalance().then(function (bal) {
                if (bal != null)
                    $('#balance').text(DwollaAPIHelpers.currencyFormat(DwollaAPIHelpers.parseMoney(bal.response)));
            });

            DwollaAPI.getFundingSources().then(function (sources) {
                if (sources != null) {
                    var dropdown = $('#source');
                    sources.forEach(function (fundingSource) {
                        if (fundingSource.name != "My Dwolla Balance") {
                            var opt = '<option value="' + fundingSource.name + '">' + fundingSource.name + '</option>';
                            dropdown.append(opt);
                        }
                    });
                }
                return false;
            });

            $('#cancel').click(function (e) {
                var host = document.getElementById("dwolla_paynow");
                host.winControl && host.winControl.unload && host.winControl.unload();
                WinJS.Utilities.empty(host);
                DwollaAPI.eventCancel();
            });

            DwollaAPIHelpers.bindEnter(pin, function () { next.trigger('click'); });

            var validate = function () {
                var passed = true;
                pin.removeClass('error');

                if (pin.val().length < 4) {
                    pin.addClass('error');
                    passed = false;
                }

                return passed;
            };
            next.click(function (e) {
                if (!validate()) {
                    return false;
                }

                var fundSource = source.find('option:selected').val();

                var state = {
                    pin: pin.val(),
                    source: fundSource,
                    to_id: $('#toid').text(),
                    to_name: $('#toname').text()
                };

                var url = "/dwollaSDK/pages/review.html";
                var host = document.getElementById("dwolla_paynow");

                host.winControl && host.winControl.unload && host.winControl.unload();
                WinJS.Utilities.empty(host);
                WinJS.UI.Pages.render(url, host, state);
            });
        }
    });
})();
