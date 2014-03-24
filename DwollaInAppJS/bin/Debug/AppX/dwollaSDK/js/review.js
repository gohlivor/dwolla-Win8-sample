(function () {
    "use strict";

    var page = WinJS.UI.Pages.define("/dwollaSDK/pages/review.html", {
        ready: function (element, options) {

            $('#review')
                .find('.to').text(options.to_name).end()
                .find('#amount').text(DwollaAPI.getAmount()).end()
                .find('#amount2').text(DwollaAPI.getAmount()).end()
                .find('.source').text(options.source).end()
                .find('.avatars')
                    .find('.to').attr('src', 'https://www.dwolla.com/avatar.aspx?u=' + options.to_id).end()

            DwollaAPI.getAccount().then(
                function (response) {
                    if (response != null) {
                        $('#review').find('.avatars')
                            .find('.from').attr('src', 'https://www.dwolla.com/avatar.aspx?u=' + response.id).end()
                    }
                });

            $('#edit').click(function (e) {
                var url = "/dwollaSDK/pages/send.html";
                var host = document.getElementById("dwolla_paynow");

                host.winControl && host.winControl.unload && host.winControl.unload();
                WinJS.Utilities.empty(host);
                WinJS.UI.Pages.render(url, host);
            });

            $('#send').click(function (e) {
                DwollaAPI.sendMoney(DwollaAPI.getAmount(), options.pin).then(
                    function (response) {
                      if (response.success) {
                        DwollaAPI.setTransactionId(response.transactionId);
                            var transactionId = response.transactionId;
                            var state = {
                                transid: transactionId,
                                pin: options.pin,
                                source: options.source,
                                to_id: options.to_id,
                                to_name: options.to_name,
                                from_src: $('#review').find('.avatars').find('.from').attr('src'),
                                amount: DwollaAPI.getAmount()
                            };
                            var url = "/dwollaSDK/pages/confirm.html";
                            var host = document.getElementById("dwolla_paynow");

                            host.winControl && host.winControl.unload && host.winControl.unload();
                            WinJS.Utilities.empty(host);
                            WinJS.UI.Pages.render(url, host, state);
                    }
                    else {
                        DwollaAPIHelpers.alert("Oh no! We couldn't process this transaction: " + response.message, function () {
                            var url = "/dwollaSDK/pages/send.html";
                            var host = document.getElementById("dwolla_paynow");

                            host.winControl && host.winControl.unload && host.winControl.unload();
                            WinJS.Utilities.empty(host);
                            WinJS.UI.Pages.render(url, host, state);
                        });
                    }
                });
            });
        }})
})();
