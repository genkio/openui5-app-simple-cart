sap.ui.controller("view.NotFound", {

	onInit : function () {
		this._router = sap.ui.core.UIComponent.getRouterFor(this);
		this._router.getTargets().getTarget("notFound").attachDisplay(this._handleDisplay, this);
	},

	_msg : "<div class='titlesNotFound'>Sorry, the requested product '{0}' can't be found.</div>",

	_handleDisplay : function (oEvent) {
		var sProductId = oEvent.getParameter("data");
		var html = this._msg.replace("{0}", sProductId);
		this.getView().byId("msgHtml").setContent(html);
	},

	handleNavBack : function () {
		this._router._myNavBack();
	}
});