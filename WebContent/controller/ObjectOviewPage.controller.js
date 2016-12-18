sap.ui.controller("ui5TileTrial.controller.ObjectOviewPage", {
    SERVICE_URL: "http://120.27.144.171:8080/Odata/Cloud_Hr.svc/",
    _formFragments: {},
    onInit: function() {
        // init model
        /*      this._initModel("Cont_Infos");
        this._initModel("Employee_Infos");
        this._initModel("Employment_Infos");*/
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("employee").attachPatternMatched(this._onObjectMatched, this);
        this._initModel("empInfo","admin");
    },
    handleHomePress: function(oEvt) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("appHome");
    },
    onEditPage: function() {
        this._toggleButtonsAndView(true);
    },
    onSavePage: function() {
        this._toggleButtonsAndView(false);
        //this._updateModel();
    },
    onUndo: function() {
        this._toggleButtonsAndView(false);
    },
    _onObjectMatched: function(oEvent) {
        var sObjectId = oEvent.getParameter("arguments").EmployeeId;
        this._initModel("empInfo", sObjectId);
        /*if(!this.getModel()){
        	this.setModel()
        }
        this.getModel().metadataLoaded().then(function() {
            var sObjectPath = this.getModel().createKey("Employee_id", {
                ObjectID: sObjectId
            });
            this._bindView("/" + sObjectPath);
        }
        .bind(this));*/
    },
    _initModel: function(oEntitySet, employee_id) {
        var that = this;
        //var employee_id = "w0001";
        var filter = "?$filter=Employee_id eq '" + employee_id + "'";
        var entity = "User('" + employee_id + "')/";
        //User('admin')/empInfo?$format=json
        /* 
						 * odata model
						 */
        
/*        OData.read({
            //url:http://120.27.144.171:8080/Odata/Cloud_Hr.svc/Cont_Infos?$filter=Employee_id%20eq%20%27w0001%27&$format=json
            //requestUri : this.SERVICE_URL + oEntitySet + filter,
            requestUri: "/sfserver/" + entity + oEntitySet,
            headers: {
                Accept: "application/json"
            }
        }, function(data, response) {
            
            var oJsonModel = new sap.ui.model.json.JSONModel();
            oJsonModel.setData(data);
            _setTableModel(oJsonModel, "Cont_info");
        }, function(err) {
            alert("Error occurred " + err.message);
        });*/
        
        var oDataModel = new sap.ui.model.odata.ODataModel("/sfserver/User");
        this.getView().setModel(oDataModel,"Cont_info");
             
						   /* json model
						   */
 /*       var oJsonModel = new sap.ui.model.json.JSONModel();
        oJsonModel.loadData("model/Cont_Info_sample.json", "", false);
        this.getView().setModel(oJsonModel, "Cont_info");*/
        var _setTableModel = function(oModel) {
            that.getView().setModel(oModel, oEntitySet);
        }
    },
    _updateModel: function(oEntitySet) {
        var that = this;
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        var oCont_info = {
            "Employee_id": "w0001",
            "Attachment": "",
            "Country": "CN",
            "Document_number": "",
            "Document_title": "",
            "Document_type": "",
            "Publish_authority": "",
            "Publish_date": "",
            "Publish_place": ""
        };
        var oUser = {
            "Auth": "admin",
            "Customer_id": "001",
            "Employee_id": "w0001",
            "Password": "pwd001",
            "Status": "04",
            "User_id": "u0001"
        }
        var request = {
            requestUri: "http://120.27.144.171:8080/Odata/Cloud_Hr.svc/Users(Customer_id='001',User_id='u0001')",
            method: 'put',
            headers: headers,
            data: oUser
        };
        OData.request(request, function(data, response) {
            console.log("put " + oEntitySet + " success");
        });
    },
    _toggleButtonsAndView: function(bEdit) {
        var oView = this.getView();
        // Show the appropriate action buttons
        oView.byId("id_edit").setVisible(!bEdit);
        oView.byId("id_save").setVisible(bEdit);
        oView.byId("id_undo").setVisible(bEdit);
        // Switch views
        this._switchViews(bEdit);
    },
    _switchViews: function(bEdit) {
        this._getSection("personal", bEdit);
        this._getSection("employee", bEdit);
        this._getSection("employment", bEdit);
        /*var oSection = this.byId("id_personalSection");
						var oBlockDispaly = oSection.getBlocks()[0];
						var oBlockEdit;
						oBlockDispaly.setVisible(!bEdit);
						
						if(oSection.getBlocks()[1]){
							oBlockEdit = oSection.getBlocks()[1];
							oBlockEdit.setVisible(bEdit);
						}else{
							jQuery.sap.require("ui5TileTrial.controller.controllerblocks.PersonalBlockEdit");
							oBlockEdit =  new ui5TileTrial.controller.controllerblocks.PersonalBlockEdit();
							var oBlockMappingPerson = oBlockDispaly.getMappings();
							var oSelectedView = oBlockDispaly.getSelectedView();
							oBlockEdit.setSelectedView(oSelectedView);
							for(i in oBlockMappingPerson){
								oBlockEdit.addMapping(oBlockMappingPerson[i]);
							}
							oSection.addBlock(oBlockEdit);	
						}*/
    },
    _getSection: function(vSection, bEdit) {
        var oSection;
        var vEditBlockView;
        var oBlockEdit;
        switch (vSection) {
        case "personal":
            oSection = this.byId("id_personalSection");
            vEditView = "ui5TileTrial.controller.controllerblocks.PersonalBlockEdit";
            jQuery.sap.require(vEditView);
            oBlockEdit = new ui5TileTrial.controller.controllerblocks.PersonalBlockEdit();
            break;
        case "employee":
            oSection = this.byId("id_employeeSection");
            vEditView = "ui5TileTrial.controller.controllerblocks.JobBlockEdit";
            jQuery.sap.require(vEditView);
            oBlockEdit = new ui5TileTrial.controller.controllerblocks.JobBlockEdit();
            break;
        case "employment":
            oSection = this.byId("id_employmentSection");
            vEditView = "ui5TileTrial.controller.controllerblocks.PayrollBlockEdit";
            jQuery.sap.require(vEditView);
            oBlockEdit = new ui5TileTrial.controller.controllerblocks.PayrollBlockEdit();
            break;
        }
        var oBlockDispaly = oSection.getBlocks()[0];
        oBlockDispaly.setVisible(!bEdit);
        if (oSection.getBlocks()[1]) {
            oBlockEdit = oSection.getBlocks()[1];
            oBlockEdit.setVisible(bEdit);
        } else {
            var oBlockMappingPerson = oBlockDispaly.getMappings();
            var oSelectedView = oBlockDispaly.getSelectedView();
            oBlockEdit.setSelectedView(oSelectedView);
            for (i in oBlockMappingPerson) {
                oBlockEdit.addMapping(oBlockMappingPerson[i]);
            }
            oSection.addBlock(oBlockEdit);
        }
    }
})
