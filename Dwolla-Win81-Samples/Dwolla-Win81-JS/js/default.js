﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    //MerchantId is the Dwolla ID of the merchant who will receive the funds.
    var merchantId = "111-222-3333";

    //Enter your App Key & Secret here
    var appKey = "";
    var appSecret = "";

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            args.setPromise(WinJS.UI.processAll().then(function () {

                // Subscribe to the Pay With Dwolla button
                payButton.addEventListener("click", DwollaAPI.payWithDwolla, false);
                $(document).on("DwollaSuccess", dwollaSuccessHandler);
                $(document).on("DwollaCancel", dwollaCancelHandler);

                //Initialize the DwollaAPI
                DwollaAPI.setAmount(0.01);
                DwollaAPI.initialize(appKey, appSecret, merchantId, true);

                logout.addEventListener("click", DwollaAPI.logout, false);
            }));
        }
    };

    //Dwolla SDK event callbacks
    function dwollaSuccessHandler(e) {
        console.log("Dwolla payment success: TransactionId = " + e.message + " at " + e.time.toLocaleString());
    }
    function dwollaCancelHandler(e) {
        console.log("Dwolla payment cancelled at " + e.time.toLocaleString());
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
