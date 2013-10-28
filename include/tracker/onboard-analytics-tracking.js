var gaJsSettings= {
	"accountId":''
	// add any other settings here and initialize them via initGaJsSettings function
};

function initGaJsSettings(settings) {
	gaJsSettings.accountId = settings.accountId;
}
function trackPage(viewid) {
	try {
		var pageTracker = _gat._getTracker(gaJsSettings.accountId);
		pageTracker._trackPageview(viewid);
	} catch(err) {}
}

