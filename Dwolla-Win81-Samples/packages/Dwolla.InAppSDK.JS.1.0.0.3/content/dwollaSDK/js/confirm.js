(function () {
    "use strict";

    var page = WinJS.UI.Pages.define("/dwollaSDK/pages/confirm.html", {
        ready: function (element, options) {

            $('#confirm')
                .find('.to').text(options.to_name).end()
                .find('#amount').text(options.amount).end()
                .find('.avatars')
                    .find('.to').attr('src', 'https://www.dwolla.com/avatar.aspx?u=' + options.to_id).end()
                    .find('.from').attr('src', options.from_src).end();

            $('#close').click(function (e) {
                var host = document.getElementById("dwolla_paynow");
                host.winControl && host.winControl.unload && host.winControl.unload();
                WinJS.Utilities.empty(host);
                DwollaAPI.eventSuccess(DwollaAPI.getTransactionId());
            });
        },
    });
})();
