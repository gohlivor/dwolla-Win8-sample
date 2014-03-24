Dwolla In-App SDK Samples  
=============================
The purpose of this SDK is to make it easy for developers to use Dwolla within your Windows 8 Store applications for in-app purchases.  The SDK works for both Windows 8 and 8.1 store apps.  There are two versions of the SDK - one for Javascript apps and one for XAML apps.

Adding the package from NuGet
=============================
1. Create a new Windows 8 Store application or open an existing application.
2. Open the NuGet Package Manager (right-click on the Windows Store project and select "Manage NuGet Packages".
3. Make sure you select "Online" on the left and search online for "Dwolla In-App SDK".
4. You should see "Dwolla In-App SDK for Windows 8".  Select the correct package (XAML or Javascript) and click "Install".  You may be prompted to accept some projects which are referenced.  Select "I Accept".

The NuGet Package will be installed and you will notice a couple of items in the project.
- References now include:  Dwolla.InAppSDK

For XAML apps:
- A new folder "DwollaSDK" has been added to your project.  This folder contains a user control that you can use in your project that performs the in-app purchase functionality.  It can be customized by the developer.
- References:
	System.Net.Http.Extensions
	System.Net.Http.Primitives

For Javascript apps:
- A new folder "dwollaSDK" has been added to your project.  This folder contains a html, Javascript, and CSS files that you can use in your project that performs the in-app purchase functionality.  It can be customized by the developer.

Getting Started - Create a Dwolla application
=============================================
To use the SDK you will need to register a free Dwolla application.  To do this go here: www.dwolla.com/applications

Be sure to request the following "scopes" when registering your application.
  Balance
  AccountInfoFull
  Send
  Funding
  Transactions

Once your application is registered and approved you will have an App Key and App Secret.  You will need these in the SDK.


Code updates for your project - XAML apps
=========================================
There are two main things you need to add to your project:
1. Reference to the Dwolla.InAppSDK.SendMoneyHelper class.
2. Implementing the UcSendMoney user control.

SendMoneyHelper class:
1. Add the following using statements in your page/control:

	using Dwolla.InAppSDK;
	using Dwolla.InAppSDK.Models;

2. Add the following constants and private variables in your page/control:

	private SendMoneyHelper _sendMoneyHelper;

	//Enter your App Key & Secret here
	private const string AppKey = "";
	private const string AppSecret = "";

	//MerchantId is the Dwolla ID of the merchant who will receive the funds.
	private const string MerchantId = "111-222-3333";

3. Using the SendMoneyHelper Class  
Once the user is ready to pay via an in-app purchase SDK you need to make sure the user has authenticated via Dwolla.  To do this follow these steps:

a) Create a new instance of the SendMoneyHelper class 
b) Call the AuthenticateUser method.  
c) If the response is successful then initialize the UcSendMoney user control by passing in the instance of the SendMoneyHelper class and the amount the user needs to pay.

When creating the instance of the SendMoneyHelper class you have the option to allow all types of funding sources or to limit funding sources to real-time only.  To limit to real-time only pass in false.

	public MainPage()
	{
		InitializeComponent();
		Loaded += MainPage_Loaded;
	}

	void MainPage_Loaded(object sender, RoutedEventArgs e)
	{
		_sendMoneyHelper = new SendMoneyHelper(MerchantId, true, AppKey, AppSecret);
		UcSendMoney.Visibility = Visibility.Collapsed;
		UcSendMoney.SendMoneyCompleted += SendMoneyComplete;
		UcSendMoney.CancelSendMoney += CloseSendMoney;
		InitDwolla();
	}

	private async void InitDwolla()
	{
		AuthenticationResponse response = await _sendMoneyHelper.AuthenticateUser();
		if (response.Success && _sendMoneyHelper.IsLoggedIn())
		{
			UcSendMoney.Initialize(_sendMoneyHelper, 1.00);
			UcSendMoney.Visibility = Visibility.Visible;
		}
	}

4. Events associated with UcSendMoney.  There are two event associated with UcSendMoney:

a) SendMoneyComplete: The user successfully sent money to the merchant via Dwolla.  The user control returns the transaction id, which could then be used to get details about that transaction.

	private void SendMoneyComplete(object sender, string e)
	{
		//Here is the transactionId
		string transactionId = e;
		GetTransactionByID(transactionId);
	}

b) CloseSendMoney:  The user cancels out of the user control.  Typically you will want to hide the user control.

	private void CloseSendMoney(object sender, string e)
	{
	}


Code updates for your project - Javascript apps
===============================================

You should have a dwollaSDK folder in your project once you install the NuGet package.  You will need to make the following updates to get things wired up.

default.html
- Add a reference to javascript files:

	<script src="/dwollaSDK/js/jquery.js"></script>
	<script src="/dwollaSDK/js/dwollaAPICore.js"></script>

default.js
- Add the following variables.

	//MerchantId is the Dwolla ID of the merchant who will receive the funds.
	var merchantId = "111-222-3333";

	//Enter your App Key & Secret here
	var appKey = "";
	var appSecret = "";

- Create instance of the DwollaAPI class in the app.onactivated event.

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
				DwollaAPI.initialize(appKey, appSecret, merchantId, true);

				logout.addEventListener("click", DwollaAPI.logout, false);
			}));
		}
	};

When clicking on the Pay with Dwolla button you will want to do the following:

- Set the amount to charge:

	DwollaAPI.setAmount(0.01);

- Call the payWithDwolla function

	DwollaAPI.payWithDwolla


Available Methods via SendMoneyHelper
=====================================

- AuthenticateUser: Authenticates user for the application

- SendMoney: Sends Money to the merchant as specified by the application

- GetAccountFundingSources: Returns a collection of FundingSources of the authenticated user

- GetAccount: Returns the Account of the authenticated user

- GetMerchantAccount: Returns the Account of the merchant

- GetBalance: Get the account balance for the authenticate user

- GetTransactionByID: Get details for a given transaction

- Logout: Forces the user to be logged out

- IsLoggedIn:  Checks to see if the user is logged in

Notes:
- If an error is thrown by the Dwolla API SendMoneyHelper passes that error back to the caller

To learn more about the Dwolla API: https://developers.dwolla.com/dev/docs


