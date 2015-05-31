jQuery.sap.declare("openui5.module.SheetAsModel");

openui5.module.SheetAsModel = {
	parseSheet : function(sKey, mSheetMeta, callback) {
		if (typeof (mSheetMeta) == "function") {
	        callback = mSheetMeta;
	        mSheetMeta = undefined;
	    }

		var sUrl = "https://spreadsheets.google.com/feeds/cells/" 
				+ sKey 
				+ "/" 
				+ (!mSheetMeta ? 1 : mSheetMeta['index'])
				+ "/public/values?alt=json";

		$.getJSON(sUrl, function(data) {
			var aHeaders = [];
			var mEntry = {};
			var mEntries = {};
			var aEntries = [];

			var sTitle = !mSheetMeta ? data.feed.title.$t : mSheetMeta['title'];
			var aEntriesFeed = data.feed.entry;
			var iNumOfCol = aEntriesFeed[aEntriesFeed.length - 1].gs$cell.col;

			// extract headers from the feed into array (first row)
			for (var i = 0; i < iNumOfCol; i ++) {
				aHeaderFeed = aEntriesFeed.shift().gs$cell.$t;
				aHeaders[i] = aHeaderFeed;
			}

			// extract the entries from the feed
			while (aEntriesFeed.length > 0) {
				for (var i = 0; i < iNumOfCol; i ++) {
					var mEntryFeed = aEntriesFeed.shift().gs$cell;
					mEntry[aHeaders[i]] = mEntryFeed.$t;
				}
				aEntries.push(mEntry);
				mEntry = {};
			}

			mEntries[sTitle] = aEntries;
			callback(mEntries);
		});
	},

	parseSheets : function(sKey, callback) {
		var sUrl = "https://spreadsheets.google.com/feeds/worksheets/" 
				+ sKey 
				+ "/public/full?alt=json";
				
		var aSheetsMeta = [];
		var mModel = {};

		$.getJSON(sUrl, function(data) {
			// extract sheets meta data (index and title) into array
	    	var mSheetMeta = {};

	    	$.each(data.feed.entry, function(index, mEntry) {
	    		mSheetMeta['index'] = index + 1;
	    		mSheetMeta['title'] = mEntry.title.$t;
	    		aSheetsMeta.push(mSheetMeta);
	    		mSheetMeta = {};
	    	});
		}).done( function() {
			while (aSheetsMeta.length > 0) {
				var mSheetMeta = aSheetsMeta.shift();
				openui5.module.SheetAsModel.parseSheet(sKey, mSheetMeta, function(data) {
					$.extend(mModel, data);
					callback(mModel);
				});
			}
		});
	}
};