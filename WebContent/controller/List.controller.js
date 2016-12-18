sap.ui.define([ 'jquery.sap.global', 'sap/m/MessageToast',
		'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller' ], function(
		jQuery, MessageToast, Fragment, Controller) {
	"use strict";

	var CController = Controller.extend("ui5TileTrial.controller.List", {
		SERVICE_URL: "/sfserver/User",
		onInit:function(){
			
			var oDataModel = new sap.ui.model.odata.ODataModel("/sfserver");
			this.getView().setModel(oDataModel);
			
			var oList=this.byId("id_empList");
			var iOriginalBusyDelay = oList.getBusyIndicatorDelay();
			//oList.bind
	        // Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oList.attachEventOnce("updateFinished", function(){
				// Restore original busy indicator delay for the list
				//oDataModel.setProperty("/delay", iOriginalBusyDelay);
			});
			var oViewModel = new sap.ui.model.json.JSONModel({
				busy : true,
				delay : 0
			});
			this.getView().setModel(oViewModel, "ListView");
			var fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};
			//this.getView().getModel().metadataLoaded()
			//.then(fnSetAppNotBusy);
	        
		},
		onupdateFinished:function(){
			// hide pull to refresh if necessary
			this.byId("pullToRefresh").hide();
		},
        onPressHome: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */


		_createViewModel : function() {
			return new JSONModel({
				isFilterBarVisible: false,
				filterBarLabel: "",
				delay: 0,
				title: this.getResourceBundle().getText("masterTitleCount", [0]),
				noDataText: this.getResourceBundle().getText("masterListNoDataText"),
				sortBy: "Name",
				groupBy: "None"
			});
		},
	});
})