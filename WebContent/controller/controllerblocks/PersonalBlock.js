sap.ui
		.define(
				[ 'sap/uxap/BlockBase' ],
				function(BlockBase) {
					"use strict";

					var GoalsBlock = BlockBase
							.extend(
									"ui5TileTrial.controller.controllerblocks.PersonalBlock",
									{
										metadata : {
											views : {
												Collapsed : {
													viewName : "ui5TileTrial.view.viewblocks.PersonalBlock",
													type : "XML"
												},
												Expanded : {
													viewName : "ui5TileTrial.view.viewblocks.PersonalBlock",
													type : "XML"
												}
											}
										},
										SERVICE_URL : "http://120.27.144.171:8080/Odata/Cloud_Hr.svc/Cont_Infos",
/*										init : function() {
											var that= this;
											OData.read({
																requestUri : this.SERVICE_URL,
																headers : {
																	Accept : "application/json"
																}
															},
															function(data,response) {
																var ContModel = new sap.ui.model.json.JSONModel();
																ContModel.setData(data.results[0]);
																_setViewModel(ContModel,that);
															},
															function(err) {
																alert("Error occurred "+ err.message);
															});
											var oJsonModel = new sap.ui.model.json.JSONModel();
											oJsonModel.loadData("model/Cont_Info_sample.json");
											sap.ui.getCore().setModel(oJsonModel, "Cont_info");
											var _setViewModel = function(oModel,that){
												//that.setModel(oModel);
												sap.ui.getCore().setModel(oModel, "Cont_info");
											}
										}*/
									});
					return GoalsBlock;
				}, true);