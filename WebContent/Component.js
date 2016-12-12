//jQuery.sap.declare("ui5TileTest.Component");
sap.ui.define([ 'sap/ui/core/UIComponent' ], function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("ui5TileTrial.Component", {

		metadata : {
			manifest : "json"
		},

		init : function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
			//init login data
			this.ModelInit();
			//login first
			this.getRouter().navTo("login");
		},
		createContent : function() {
			var oViewData = {
				compoent : this
			};
			return sap.ui.view({
				viewName : "ui5TileTrial.view.MasterApp",
				type : sap.ui.core.mvc.ViewType.XML,
				viewData : oViewData
			})

		},
		ModelInit:function(){
			var oModel = new sap.ui.model.json.JSONModel({
				name : "",
				login:"",
				role:""
			});

			sap.ui.getCore().setModel(oModel,"user");
		}
	});
})
