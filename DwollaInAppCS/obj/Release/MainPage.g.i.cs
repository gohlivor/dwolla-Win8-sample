﻿

#pragma checksum "C:\Users\chris\Documents\GitHub\dwolla-Win8-sample\DwollaInAppCS\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "158A8D6FF71C084A89BDD9330C72C0A2"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DwollaInAppCS
{
    partial class MainPage : global::Windows.UI.Xaml.Controls.Page
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::Windows.UI.Xaml.Controls.Grid GridStore; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::Windows.UI.Xaml.Controls.StackPanel SpPayNow; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::DwollaInAppCS.DwollaSDK.UcSendMoney UcSendMoney; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::Windows.UI.Xaml.Controls.StackPanel SpStore; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::Windows.UI.Xaml.Controls.TextBlock TxtAmount; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::Windows.UI.Xaml.Controls.TextBlock TxtResponse; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private global::Windows.UI.Xaml.Controls.Button BtnLogout; 
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        private bool _contentLoaded;

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 4.0.0.0")]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void InitializeComponent()
        {
            if (_contentLoaded)
                return;

            _contentLoaded = true;
            global::Windows.UI.Xaml.Application.LoadComponent(this, new global::System.Uri("ms-appx:///MainPage.xaml"), global::Windows.UI.Xaml.Controls.Primitives.ComponentResourceLocation.Application);
 
            GridStore = (global::Windows.UI.Xaml.Controls.Grid)this.FindName("GridStore");
            SpPayNow = (global::Windows.UI.Xaml.Controls.StackPanel)this.FindName("SpPayNow");
            UcSendMoney = (global::DwollaInAppCS.DwollaSDK.UcSendMoney)this.FindName("UcSendMoney");
            SpStore = (global::Windows.UI.Xaml.Controls.StackPanel)this.FindName("SpStore");
            TxtAmount = (global::Windows.UI.Xaml.Controls.TextBlock)this.FindName("TxtAmount");
            TxtResponse = (global::Windows.UI.Xaml.Controls.TextBlock)this.FindName("TxtResponse");
            BtnLogout = (global::Windows.UI.Xaml.Controls.Button)this.FindName("BtnLogout");
        }
    }
}


