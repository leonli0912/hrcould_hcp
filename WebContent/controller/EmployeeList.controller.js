sap.ui.define(['jquery.sap.global', 'sap/m/MessageToast', 'sap/ui/core/Fragment', 'sap/ui/core/mvc/Controller'], function(jQuery, MessageToast, Fragment, Controller) {
    "use strict";
    var CController = Controller.extend("ui5TileTrial.controller.EmployeeList", {
        //SERVICE_URL: "http://120.27.144.171:8080/Odata/Cloud_Hr.svc/",
        SERVICE_URL:"https://sfserver/User",
        onInit: function() {
            //this._createIframe();
            //this.getRouter().getRoute("PurchaseOrderDetails").attachPatternMatched(this.onPOMatched, this);
            var that = this;
            			$.ajax({
				type : "GET",
				dataType : 'json',
				url : this.SERVICE_URL + "?$format=json",
				contentType : "application/json",
				success : function(json, that) {

					console.log("success...");
					var masterModel = new sap.ui.model.json.JSONModel();
					masterModel.setData(json.d.results);
					_setTableModel(masterModel);
				},
				error : function(e) {
					console.log(e.message);
				}
			});
           /* var masterModel = new sap.ui.model.json.JSONModel();
            masterModel.loadData("./model/people.json",false);*/
            
            var _setTableModel = function(oModel) {
                that.getView().setModel(oModel);
                var oTable = that.byId("id_EmployeeList");
                oTable.setModel(oModel);
            };
            //_setTableModel(masterModel);

        },
        onPressHome: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onPressToDetail: function(oEvt) {
            var vEmployeeId = oEvt.getSource().getTitle();
            var oSplitPage = this.byId("SplitStock");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employee", {
                EmployeeId: vEmployeeId
            }, false);
            //oSplitPage.toDetail(this.createId(sToPageId));
        },
        onPressAdd: function(oEvt) {
            var that = this;
            var endDate = new Date();
            var startDate = new Date();
            endDate.setFullYear(2017, 12, 31);
            var entitySet = "Customers";
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            var newPerson = {
                'Customer_id': '005',
                'Customer_name': 'employee5',
                'Customer_status': 'Active',
                'Customer_type': 'FTE'
            };
            var newUer = {
                "Auth": "admin",
                "Customer_id": "001",
                "Employee_id": "w0001",
                "Password": "",
                "Status": "",
                "User_id": "u0001"
            };
            var newCont_info = {
                "Employee_id": "w0001",
                "End_date": endDate,
                "Attachment": "",
                "Country": "CN",
                "Document_number": "",
                "Document_title": "",
                "Document_type": "",
                "Expire_date": endDate,
                "Publish_authority": "",
                "Publish_date": "",
                "Publish_place": "",
                "Start_date": startDate
            };
            var newEmployee_info = {
                "Employee_id": "w0001",
                "End_date": endDate,
                "Begin_date": startDate,
                "Birth_country": "CN",
                "Birth_place": "Shanghai",
                "Birthday": "19880912",
                "Email": "ly95487532@163.com",
                "Ethnic": "",
                "First_name": "Tang",
                "Gender": "Female",
                "Hire_date": startDate,
                "Id_number": "w0001",
                "Id_type": "11",
                "Language": "cn",
                "Last_name": "Tom",
                "Marital_begin": startDate,
                "Marital_status": "active",
                "Nationality": "cn",
                "Phone": "13795487532",
                "Residence_type": "long"
            };
            var newEmployment_info = {
                "Employee_id": "w0001",
                "End_date": endDate,
                "Company": "wills",
                "Employee_group": "",
                "Grade": "2",
                "Hr_manager": "HR",
                "Line_manager": "Manager",
                "Position": "Developer",
                "Position_category": "Dev",
                "Start_date": startDate
            };
            // add customers
            /*			var request = {
				requestUri : SERVICE_URL + "Customers",
				method : 'post',
				headers : headers,
				data : newPerson
			};
			OData.request(request, function(data, response) {

				console.log("post customers success");
			});*/
            // add users
            var request = {
                requestUri: this.SERVICE_URL + "Users",
                method: 'post',
                headers: headers,
                data: newUer
            };
            OData.request(request, function(data, response) {
                console.log("post users success");
            });
            // add cont_info
            var request = {
                requestUri: this.SERVICE_URL + "Cont_Infos",
                method: 'post',
                headers: headers,
                data: newCont_info
            };
            OData.request(request, function(data, response) {
                console.log("post cont_info success");
            });
            // add employee
            var request = {
                requestUri: this.SERVICE_URL + "Employee_Infos",
                method: 'post',
                headers: headers,
                data: newEmployee_info
            };
            OData.request(request, function(data, response) {
                console.log("post employee success");
            });
            // add employment
            var request = {
                requestUri: this.SERVICE_URL + "Employment_Infos",
                method: 'post',
                headers: headers,
                data: newEmployment_info
            };
            OData.request(request, function(data, response) {
                console.log("post employment success");
            });
            /*
			 * OData.read({ requestUri: serviceRoot, headers: { Accept:
			 * "application/json" } }, function(data,response) { var stockModel =
			 * new sap.ui.model.json.JSONModel();
			 * stockModel.setData(data.results); _setTableModel(stockModel); },
			 * function(err) { alert("Error occurred " + err.message); });
			 */
            /*
			 * var _setTableModel = function(oModel) {
			 * that.getView().setModel(oModel); var oTable = that
			 * .byId("id_stockList"); oTable.setModel(oModel); };
			 */
        },
        _createIframe: function() {
            var oDetailedPage = this.byId("stockDetail");
            var oObjectView = sap.ui.view({
                viewName: "ui5TileTrial.view.ObjectOviewPage",
                type: sap.ui.core.mvc.ViewType.XML
            });
            //oObjectView.placeAt("content");
            oDetailedPage.addContent(oObjectView);
        }
    });
})