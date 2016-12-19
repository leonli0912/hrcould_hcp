sap.ui.define(['jquery.sap.global', 'sap/m/MessageToast',
	'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller'
], function(
	jQuery, MessageToast, Fragment, Controller) {
	"use strict";

	var CController = Controller.extend("ui5TileTrial.controller.Object", {
		SERVICE_URL: "/sfserver/User",
		oRouter: null,
		onInit: function() {
			var oDataModel = new sap.ui.model.odata.ODataModel("/sfserver");
			this.getView().setModel(oDataModel);
			var oViewModel = new sap.ui.model.json.JSONModel({
					busy: true,
					delay: 0
				});
			this.getView().setModel(oViewModel, "objectView");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		    this.oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent) {
			var sObjectPath = "/User('" + oEvent.getParameter("arguments").objectId + "')";
			this._bindView(sObjectPath);
		},
		_bindView: function(sObjectPath) {
			var oViewModel = this.getView().getModel("objectView"),
				oDataModel = this.getView().getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					//change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.attachMetadataLoaded(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		}
	});

});