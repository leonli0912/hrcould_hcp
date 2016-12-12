sap.ui.define([ 'jquery.sap.global', 'sap/m/MessageToast',
		'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller' ], function(
		jQuery, MessageToast, Fragment, Controller) {
	"use strict";

	var CController = Controller.extend("ui5TileTrial.controller.MasterApp", {
		onInit:function(){
			var oApp = sap.ui.getCore().byId("myApp");
			if(oApp == null){
				oApp = this.byId("myApp");
				this.getOwnerComponent().setModel("app",oApp);
			}
		}
	});
})