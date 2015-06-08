sap.ui.controller("view.Welcome", {
	onInit : function () {
	    // set mock model
	    var oModel = new sap.ui.model.json.JSONModel("model/tile.json");
	    this.getView().setModel(oModel);
	}
});