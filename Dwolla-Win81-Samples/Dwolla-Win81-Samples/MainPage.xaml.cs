using System;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Navigation;
using Dwolla.InAppSDK;
using Dwolla.InAppSDK.Models;

namespace Dwolla_Win81_Samples
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage
    {
        #region Private Variables

        private SendMoneyHelper _sendMoneyHelper;

        //Enter your App Key & Secret here
        private const string AppKey = "";
        private const string AppSecret = "";
        private const string MerchantId = "111-222-3333";
        #endregion

        #region page methods

        public MainPage()
        {
            InitializeComponent();
            Loaded += MainPage_Loaded;
        }

        void MainPage_Loaded(object sender, RoutedEventArgs e)
        {
            _sendMoneyHelper = new SendMoneyHelper(MerchantId, true, AppKey, AppSecret);
            UcSendMoney.SendMoneyCompleted += SendMoneyComplete;
            UcSendMoney.CancelSendMoney += CloseSendMoney;
            SetLoginStatus();
            Initialize();
        }

        /// <summary>
        /// Invoked when this page is about to be displayed in a Frame.
        /// </summary>
        /// <param name="e">Event data that describes how this page was reached.  The Parameter
        /// property is typically used to configure the page.</param>
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
        }

        /// <summary>
        /// Setup the control to show the initial screen
        /// </summary>
        private void Initialize()
        {
            SpStore.Visibility = Visibility.Visible;
            GridStore.Visibility = Visibility.Visible;
            SpPayNow.Visibility = Visibility.Collapsed;
        }

        /// <summary>
        /// Event handler fired from UcSendMoney if the user cancels
        /// </summary>
        private void CloseSendMoney(object sender, string e)
        {
            Initialize();
        }

        /// <summary>
        /// Event handler fired from UcSendMoney when user is finished sending money (clicks done)
        /// </summary>
        private void SendMoneyComplete(object sender, string e)
        {
            //Here is the transactionId
            string transactionId = e;
            GetTransactionByID(transactionId);
            Initialize();
        }

        #endregion

        #region Authentication Methods

        /// <summary>
        /// Used to set the visibility of the logout button
        /// </summary>
        private void SetLoginStatus()
        {
            if (_sendMoneyHelper != null)
            {
                //TxtLoginStatus.Text = _sendMoneyHelper.IsLoggedIn() ? "Logged In" : "Not Logged In";
                BtnLogout.Visibility = _sendMoneyHelper.IsLoggedIn() ? Visibility.Visible : Visibility.Collapsed;
            }
        }

        /// <summary>
        /// Gets transaction details by ID.  Useful after send money is completed.
        /// </summary>
        /// <param name="transactionId">The transaction Id</param>
        private async void GetTransactionByID(string transactionId)
        {
            if (_sendMoneyHelper != null)
            {
                var transaction = await _sendMoneyHelper.GetTransactionByID(transactionId);
                TxtResponse.Text = transaction.Id;
            }
        }

        /// <summary>
        /// Used to show and initialize the UcSendMoney control.
        /// </summary>
        private void SetPayNowStatus()
        {
            if (_sendMoneyHelper != null)
            {
                SpPayNow.Visibility = _sendMoneyHelper.IsLoggedIn() ? Visibility.Visible : Visibility.Collapsed;
                SpStore.Visibility = _sendMoneyHelper.IsLoggedIn() ? Visibility.Collapsed : Visibility.Visible;
                GridStore.Visibility = _sendMoneyHelper.IsLoggedIn() ? Visibility.Collapsed : Visibility.Visible;
                if (_sendMoneyHelper.IsLoggedIn())
                {
                    UcSendMoney.Initialize(_sendMoneyHelper, Convert.ToDouble(TxtAmount.Text.Replace("$", "")));
                }
            }
        }

        private void ButtonBase_OnClick(object sender, RoutedEventArgs e)
        {
            Authenticate();
        }

        /// <summary>
        /// Authenticates the user using the SDK
        /// </summary>
        private async void Authenticate()
        {
            if (_sendMoneyHelper != null)
            {
                AuthenticationResponse response = await _sendMoneyHelper.AuthenticateUser();
                //if (response != null)
                //{
                //    TxtResponse.Text = response.Message;
                //}

                if (_sendMoneyHelper.IsLoggedIn())
                {
                    ////Get the balance just for fun
                    //BalanceResponse bal = await _sendMoneyHelper.GetBalance();
                    //if (bal != null)
                    //    TxtResponse.Text += "; balance: " + bal.Response;

                    //Authenticated so now prompt user for payment
                    SetPayNowStatus();
                }

                SetLoginStatus();
            }
        }

        private void Logout_OnClick(object sender, RoutedEventArgs e)
        {
            if (_sendMoneyHelper != null)
            {
                _sendMoneyHelper.Logout();
                SetLoginStatus();
            }
        }

        #endregion
    }
}
