/**
 * SETUP APPLICATION AS A BROADCAST RECEIVER
 */
var broadcastReceiver = Ti.Android.createBroadcastReceiver({
	onReceived : function(e) {
		var intent = e.intent;
		Ti.API.info('intent.hasExtra :' + JSON.stringify(intent.hasExtra("com.motorolasolutions.emdk.datawedge.source")) + intent.getStringExtra("com.motorolasolutions.emdk.datawedge.data_string")); 
		var message;
		if (intent.hasExtra("com.motorolasolutions.emdk.datawedge.source") && (message = intent.getStringExtra("com.motorolasolutions.emdk.datawedge.data_string"))) {
			$.responseTxt.value+="\n"+message; 
		}
	}
});

Ti.Android.registerBroadcastReceiver(broadcastReceiver, ['com.familydollar.invpricing.RECVR']);	

/** Initialization Function **/
(function init(){
	$.responseTxt.value = "*** RESPONSES ***";
	var intent = Ti.Android.createBroadcastIntent({
		action: 'com.motorolasolutions.emdk.datawedge.api.ACTION_SOFTSCANTRIGGER'
	});
	intent.putExtra("com.motorolasolutions.emdk.datawedge.api.EXTRA_PARAMETER", 'TOGGLE_SCANNING');
	Ti.Android.currentActivity.sendBroadcastWithPermission(intent, 'com.yourdomain.yourProject.RECVR');
	$.index.open();
})();
