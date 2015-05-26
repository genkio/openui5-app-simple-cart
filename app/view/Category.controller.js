jQuery.sap.require("util.Formatter");
jQuery.sap.require("openui5.module.SheetAsModel");

sap.ui.controller("view.Category", {

	onInit : function () {
		this._router = sap.ui.core.UIComponent.getRouterFor(this);
		this._router.getRoute("category").attachMatched(this._loadCategory, this);

		var oProductList = this.getView().byId("productList");
		var sSheetUrl = "153YaD-9Wga3ZkIvHLwO0Nbphn5wQm806U3jNgVHqK7c";
      	openui5.module.SheetAsModel.parseSheet(sSheetUrl, function(data) {
      		var oModel = new sap.ui.model.json.JSONModel();
      		oModel.setData(data);
        	oProductList.setModel(oModel);
      	});
	},

	_loadCategory : function(oEvent) {
		var oProductList = this.getView().byId("productList");
		this._changeNoDataTextToIndicateLoading(oProductList);
		var oBinding = oProductList.getBinding("items");
		oBinding.attachDataReceived(this.fnDataReceived, this);
		var sId = oEvent.getParameter("arguments").id;
		this._sProductId = oEvent.getParameter("arguments").productId;
		this.getView().byId("page").setTitle(sId);
		var oFilter = new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, sId);
		oBinding.filter([ oFilter ]);
	},

	_changeNoDataTextToIndicateLoading: function (oList) {
		var sOldNoDataText = oList.getNoDataText();
		oList.setNoDataText("Loading...");
		oList.attachEventOnce("updateFinished", function() {oList.setNoDataText(sOldNoDataText);});
	},

	fnDataReceived: function(oEvent) {
		var that = this,
			oList = this.getView().byId("productList");
		var aListItems = oList.getItems();
		aListItems.some(function(oItem) {
			if (oItem.getBindingContext().sPath === "/Products('" + that._sProductId + "')") {
				oList.setSelectedItem(oItem);
				return true;
			}
		});
	},

	handleProductListSelect : function (oEvent) {
		this._showProduct(oEvent);
	},

	handleProductListItemPress : function (oEvent) {
		this._showProduct(oEvent);
	},

	_showProduct: function (oEvent) {
		var oBindContext;
		if (sap.ui.Device.system.phone) {
			oBindContext = oEvent.getSource().getBindingContext();
		} else {
			oBindContext = oEvent.getSource().getSelectedItem().getBindingContext();
		}
		var oModel = oBindContext.getModel();
		
		var iObjectIdx = parseInt(oBindContext.getPath().match(/\d+/)[0]);
		var sCategoryId = oModel.getData().Products[iObjectIdx].Category;
		var sProductId = oModel.getData().Products[iObjectIdx].ProductId;

		this._router.navTo("product", {id: sCategoryId, productId: sProductId}, !sap.ui.Device.system.phone);
	},

	handleNavButtonPress : function (oEvent) {
		this.getOwnerComponent().myNavBack();
	},

	handleCartButtonPress :  function (oEvent) {
		this._router.navTo("cart");
	}
});
