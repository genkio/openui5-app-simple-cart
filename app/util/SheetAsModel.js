jQuery.sap.declare("openui5.module.SheetAsModel");

openui5.module.SheetAsModel = {
	parseSheet : function(sKey, callback) {
		var url = "https://spreadsheets.google.com/feeds/cells/" + sKey + "/od6/public/values?alt=json";

		$.getJSON(url, function(data) {
			var headers = [];
			var entryObject = {};
			var entriesObject = {};
			var entriesArray = [];

			var title = data.feed.title.$t;
			var entries = data.feed.entry;
			var numOfCols = entries[entries.length - 1].gs$cell.col;

			// extract the headers (first row)
			for (var i = 0; i < numOfCols; i ++) {
				headerEntry = entries.shift().gs$cell.$t;
				headers[i] = headerEntry;
			}

			// extract the entries
			while (entries.length > 0) {
				for (var i = 0; i < numOfCols; i ++) {
					var entry = entries.shift().gs$cell;
					entryObject[headers[i]] = entry.$t;
				}
				entriesArray.push(entryObject);
				entryObject = {};
			}

			entriesObject[title] = entriesArray;
			callback(entriesObject);
		});
	}
};