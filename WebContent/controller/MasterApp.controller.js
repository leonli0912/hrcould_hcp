sap.ui.define([ 'jquery.sap.global', 'sap/m/MessageToast',
		'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller',"sap/ui/model/json/JSONModel" ], function(
		jQuery, MessageToast, Fragment, Controller,JSONModel) {
	"use strict";

	var CController = Controller.extend("ui5TileTrial.controller.MasterApp", {
		onInit:function(){
			
			var oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
			var fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			//this.getOwnerComponent().getModel().metadataLoaded()
			//		.then(fnSetAppNotBusy);
			
			var oApp = sap.ui.getCore().byId("myApp");
			if(oApp == null){
				oApp = this.byId("myApp");
				this.getOwnerComponent().setModel("app",oApp);
			}
		}
	});
})