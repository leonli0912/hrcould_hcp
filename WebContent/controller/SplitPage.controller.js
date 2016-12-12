sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, MessageToast, Fragment, Controller,JSONModel) {
	"use strict";
 
	var CController = Controller.extend("ui5TileTrial.controller.SplitPage", {
 
		onInit: function(){
			this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			var oMasterList = this.byId("id_masterList");
			var oModel = new JSONModel(jQuery.sap.getModulePath("ui5TileTrial", "/model/people.json"));
			this.getView().setModel(oModel);
		},
		
		//master1 navback
		onPressHome:function(oEvent){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("appHome");
		},

		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},

		onPressNavToDetail : function(oEvent) {
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},

		onPressGoToMaster : function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},

		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		}

	});


	return CController;

 
});