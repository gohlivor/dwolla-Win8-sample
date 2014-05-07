var dwollaSendMoney = null;

WinJS.Namespace.define("DwollaAPI", {

    initialize: function (appKey, appSecret, merchantId, allowAllFundingSources) {
        dwollaSendMoney = Dwolla.InAppSDK.SendMoneyHelper(merchantId, allowAllFundingSources, appKey, appSecret);
    },

    sendMoney: function (amount, pin) {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.sendMoney(amount, pin);
        return null;
    },

    getBalance: function () {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.getBalance();
        return null;
    },

    getFundingSources: function() {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.getAccountFundingSources();
        return null;
    },

    getAccount: function () {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.getAccount();
        return null;
    },

    getMerchantAccount: function () {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.getMerchantAccount();
        return null;
    },

    logout: function () {
        if (dwollaSendMoney != null)
            dwollaSendMoney.logout();
    },

    isLoggedIn: function() {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.isLoggedIn();
        return false;
    },

    authenticateUser: function() {
        if (dwollaSendMoney != null)
            return dwollaSendMoney.authenticateUser();
        return false;
    },
    setAmount: function (amount) {
        window.localStorage.setItem('dwollaamount', amount);
    },
    getAmount: function () {
        return window.localStorage.getItem('dwollaamount');
    },
    setTransactionId: function (transid) {
        window.localStorage.setItem('dwollatransactionid', transid);
    },
    getTransactionId: function () {
        return window.localStorage.getItem('dwollatransactionid');
    },
    payWithDwolla:function (mouseEvent) {
        DwollaAPI.authenticateUser().then(
            function (response) {
                if (response != null && response.success) {
                    if (DwollaAPI.isLoggedIn) {
                        var url = "/dwollaSDK/pages/send.html";
                        var host = document.getElementById("dwolla_paynow");
                        host.winControl && host.winControl.unload && host.winControl.unload();
                        WinJS.Utilities.empty(host);
                        WinJS.UI.Pages.render(url, host);
                    }
                }
            });
    },
    eventSuccess: function (transactionId) {
        $.event.trigger({
            type: "DwollaSuccess",
            message: transactionId,
            time: new Date()
        });
    },
    eventCancel: function () {
        $.event.trigger({
            type: "DwollaCancel",
            message: "",
            time: new Date()
        });
    },
});

var messageDialog = new Windows.UI.Popups.MessageDialog(''),
    messageDialogActive = false,
    messageDialogQueue = [];

WinJS.Namespace.define("DwollaAPIHelpers", {

    bindEnter: function (el, action) {
        el.on('keydown', function (e) {
            if (e.keyCode == 13) {
                action();
            }
        });
    },

    alert: function (str, fn) {
        if (fn == null) {
            fn = $.noop;
        };

        if (messageDialogActive) {
            // Queue message
            if (str) {
                messageDialogQueue.push({ 'str': str, 'fn': fn });
            }

            return false;
        }

        messageDialogActive = true;

        messageDialog.content = str || 'Something went wrong...';
        messageDialog.showAsync().done(function () {
            messageDialogActive = false;
            fn();

            if (messageDialogQueue.length) {
                var nextMessage = messageDialogQueue.shift();
                Dwolla.alert(nextMessage['str'], nextMessage['fn']);
            }
        });
        return false;
    },

    parseMoney: function (str) {
        var out = ('' + str).replace(/\$/g, '');

        out = parseFloat(out).toFixed(2);

        return isNaN(out) ? '0.00' : out;
    },

    currencyFormat: function (value) {
        // Determine the current user's default currency.
        var userCurrency = Windows.System.UserProfile.GlobalizationPreferences.currencies;
        // Create formatter initialized using the current user's preference settings for number formatting.
        var userCurrencyFormat = new Windows.Globalization.NumberFormatting.CurrencyFormatter(userCurrency);
        return userCurrencyFormat.format(value);
    },

});
