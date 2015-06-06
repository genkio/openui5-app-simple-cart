jQuery.sap.require("util.Formatter");
jQuery.sap.require("openui5.module.SheetAsModel");
jQuery.sap.require("util.Util");

sap.ui.controller("view.Category", {

	onInit : function () {
		this._router = sap.ui.core.UIComponent.getRouterFor(this);
		this._router.getRoute("category").attachMatched(this._loadCategory, this);
	},

	_loadCategory : function(oEvent) {
		if (!this.getView().getModel()) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("home", {}, true);
			if (!sap.ui.Device.system.phone) {
				this._router.getTargets().display("welcome");
			}
		} else {
			var oProductList = this.getView().byId("productList");
			this._changeNoDataTextToIndicateLoading(oProductList);
			var oBinding = oProductList.getBinding("items");
			oBinding.attachDataReceived(this.fnDataReceived, this);
			var sId = oEvent.getParameter("arguments").id;
			this._sProductId = oEvent.getParameter("arguments").productId;
			this.getView().byId("page").setTitle(sId);
			var oFilter = new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, sId);
			oBinding.filter([ oFilter ]);
		}
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
		
		var iObjectIdx = util.Util.parseIndex(oBindContext.getPath());
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
