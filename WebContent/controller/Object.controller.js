sap.ui.define(['jquery.sap.global', 'sap/m/MessageToast',
	'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller'
], function(
	jQuery, MessageToast, Fragment, Controller) {
	"use strict";

	var CController = Controller.extend("ui5TileTrial.controller.Object", {
		SERVICE_URL: "/sfserver/User",
		oRouter: null,
		objectId: null,
		onInit: function() {
			var oDataModel = new sap.ui.model.odata.v2.ODataModel("/sfserver", {
				useBatch: false
			});
			this.getView().setModel(oDataModel);
			var oViewModel = new sap.ui.model.json.JSONModel({
				busy: true,
				delay: 0
			});
			this.getView().setModel(oViewModel, "objectView");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);
		},
		onNavBack: function() {
			history.go(-1);
		},
		onPost: function(oEvent) {
			var oFeedContent = this.byId("idFeedContent");
			//oFeedContent.setBusy(true);
			var oDataModel = this.getView().getModel();
			var oObjectData = oDataModel.getObject("/User('" + this.objectId + "')");
			var sValue = oEvent.getParameter("value");
			oObjectData.custom01 = sValue;
			oObjectData.lastModifiedDateTime = null;
			oObjectData.lastModifiedWithTZ = null;
			oDataModel.setProperty("/User('" + this.objectId + "')/custom01", sValue);

			/*		oDataModel.update("/User('" + this.objectId + "')", oObjectData, {
						success: function() {
							oFeedContent.setBusy(false);
						},
						error: function(err) {
							oFeedContent.setBusy(false);
						}
					});*/
		},
		_onObjectMatched: function(oEvent) {
			this.objectId = oEvent.getParameter("arguments").objectId;
			var sObjectPath = "/User('" + oEvent.getParameter("arguments").objectId + "')";
			this._bindView(sObjectPath);
		},
		_bindView: function(sObjectPath) {
			var oViewModel = this.getView().getModel("objectView"),
				oDataModel = this.getView().getModel();
				oViewModel.setProperty("/busy", true);
				
			var oHeader = this.byId("idobjectHeader");
			var oAttribute1 = this.byId("idheaderAttri1");
			var oAttribute2 = this.byId("idheaderAttri2");
			var strHeaderPath = "/Photo(photoType=3,userId='" + this.objectId + "')";
			var oFilter = new sap.ui.model.Filter("userId", sap.ui.model.FilterOperator.EQ, this.objectId);
/*			oDataModel.read("/Photo", {
				filters: [oFilter],
				success: function(data) {
					var object = data.getData();
				},
				error: function(body) {
					var obody = body.getData();
				}
			});*/

			oHeader.bindElement({
				path: strHeaderPath,
				events: {
					//change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.attachMetadataLoaded(function() {

							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.

						});
					},
					dataReceived: function(data) {
						//data:image/png;base64,
					/*	var oPhoto = data.getParameters();
						if (oPhoto.data) {
							var strIcon = "data:" + oPhoto.data.mimeType + ";base64," + oPhoto.data.photo;
							oHeader.setIcon(strIcon);
						}else{
							oHeader.setIcon("./img/people/beautifulgirl.png");
						}*/

					}
				}
			});

			var oForm = this.byId("SimpleFormDisplay");
			oForm.bindElement({
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
					dataReceived: function(data) {
						//	oHeader.setTitle(data.getParameters().data.lastName);                         )
						oHeader.setTitle(data.getParameters().data.defaultFullName);
						//var aAttri = oHeader.getAttributes();
						oAttribute1.setText(data.getParameters().data.jobCode) ;
						oAttribute2.setText(data.getParameters().data.email) ;
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		}
	});

});