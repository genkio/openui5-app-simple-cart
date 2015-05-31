jQuery.sap.declare("util.Util");

util.Util = {

	parseIndex : function (sPath) {
		return sPath.match(/\d+/)[0];
	}

};