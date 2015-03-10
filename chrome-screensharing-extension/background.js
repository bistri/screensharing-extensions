// when connect event is triggered from init.js
chrome.runtime.onConnect.addListener( function( port ){
	// listen for messages from the port
    port.onMessage.addListener( function( message ){
		// send back a "pending" answer on the port
		port.postMessage( {
			"answer": 1,
			"state": "pending",
			"requestId": message.requestId
		} );
		chrome.desktopCapture.chooseDesktopMedia( message.data /*["screen", "window"]*/, port.sender.tab, function( id ){
			var response = {
				"answer": 1,
				"state": "completed",
				"requestId": message.requestId,
				"streamId": id || undefined
			};
			// send back a "completed" answer on the port
			port.postMessage( response );
		} );
	} );
} );