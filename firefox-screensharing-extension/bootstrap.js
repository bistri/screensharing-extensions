
var customer_domains = [
    "bistri.com",
    "bistri.me",
    "*.bistri.com",
    "*.bistri.me",
    "fiddle.jshell.net/*",
    "run.jsbin.io/*"
];

/*
 ****************************************
 *     DO NOT EDIT UNDER THIS LINE      *
 ****************************************
*/

 Components.utils.import("resource://gre/modules/Services.jsm");

var addon_domains             = [];
var allowed_domains_pref      = 'media.getusermedia.screensharing.allowed_domains';
var enable_screensharing_pref = 'media.getusermedia.screensharing.enabled';
var WindowListener            = {
    onOpenWindow: function( xulWindow )
    {
        var window = xulWindow.QueryInterface( Components.interfaces.nsIInterfaceRequestor ).getInterface( Components.interfaces.nsIDOMWindow );
        function onWindowLoad(){
            window.removeEventListener( 'load', onWindowLoad );
            if( window.document.documentElement.getAttribute( 'windowtype' ) == 'navigator:browser' ){
                loadIntoWindow( window );
            }
        }
        window.addEventListener( 'load', onWindowLoad );
    },
    onCloseWindow: function( xulWindow )
    {
    },
    onWindowTitleChange: function( xulWindow, newTitle )
    {
    }
};

function forEachOpenWindow( fn )
{
    var windows = Services.wm.getEnumerator( 'navigator:browser' );
    while( windows.hasMoreElements() )
    {
        fn( windows.getNext().QueryInterface( Components.interfaces.nsIDOMWindow ) );
    }
}

function loadIntoWindow( window )
{
    window.gBrowser.addEventListener( 'load', function( event )
    {
        insertTag( event.target );
    }, true);
    for( var i=0; i<window.length; i++ )
    {
        insertTag( window[ i ].document );
    }
}

function insertTag( doc ){
    var insert = false;
    customer_domains.forEach( function( domain )
    {
        if( doc.URL.indexOf( domain ) != -1 )
        {
            insert = true;
        }
    } );
    if( insert )
    {
        var node = doc.createElement( 'div' );
        node.id = 'bistri-screen-sharing-installed';
        doc.body.appendChild( node );
    }
}

function startup(data, reason)
{
    if(reason !== APP_STARTUP)
    {
        var prefs = Components.classes[ '@mozilla.org/preferences-service;1' ].getService( Components.interfaces.nsIPrefBranch );
        var values = prefs.getCharPref( allowed_domains_pref ).split( ',' );    
        customer_domains.forEach( function( domain )
        {
            if( values.indexOf( domain ) === -1 )
            {
                values.push( domain );
                addon_domains.push( domain );
            }
        } );
        if( prefs.getBoolPref( enable_screensharing_pref ) == false )
        {
            prefs.setBoolPref( enable_screensharing_pref, 1 );
        }
        prefs.setCharPref( allowed_domains_pref, values.join( ',' ) );
    }
    forEachOpenWindow( loadIntoWindow );
    Services.wm.addListener( WindowListener );
}

function shutdown( data, reason )
{
    if( reason !== APP_SHUTDOWN )
    {
        var prefs = Components.classes[ '@mozilla.org/preferences-service;1' ].getService( Components.interfaces.nsIPrefBranch );
        var values = prefs.getCharPref( allowed_domains_pref ).split( ',' );

        values = values.filter( function( value )
        {
            return addon_domains.indexOf( value ) === -1;
        } );
        prefs.setCharPref( allowed_domains_pref, values.join( ',' ) );
    }
    Services.wm.removeListener( WindowListener );
}

function install(data, reason){}
function uninstall(data, reason){}
