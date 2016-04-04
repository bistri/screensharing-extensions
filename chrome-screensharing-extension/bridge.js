// open a port to communicate with background
var port = chrome.runtime.connect();

// create node
var node = document.createElement( 'div' );

// listen for messages from webpage and forward them to the background, through the previously opened port
window.addEventListener( 'message', function ( event ){
    if ( event.source != window || !event.data ){
        return;
    }
    // prevent to return answer to the background
    if( event.data.answer ){
        return;
    }
    port.postMessage( event.data );
} );

// listen for messages from background and forward them to the webpage
port.onMessage.addListener( function( data ){
    window.postMessage( data, '*' );
} );

// DO NOT MODIFY THE LINE BELOW
node.id = 'bistri-screen-sharing-installed';

// insert tag into parent page
document.body.appendChild( node );
