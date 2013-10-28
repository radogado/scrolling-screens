if (typeof customTracker_GetParam == 'undefined') document.write(
    '<script type="text/javascript" src="rid.js">/**/</script>'
);

function createCookie ( name, value, days ) {
	if (days) {
		var date = new Date(); date.setTime(date.getTime()+(days*24*60*60*1000)); var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie ( name ) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var cookie = readCookie("REFERRAL_ID");

function check_cookie ( refid ) {
	var exceptions = [ 9874249, 9874300, 9874272, 9874388, 9874375, 6972519 ];
	var i = -1;
	while ( exceptions[++i] ) { 
		if ( exceptions[i] == refid ) 
			return true; 
	}
	return false;	
}

if ( check_cookie(cookie) ) 
{
    sessvars.rid = cookie;
    var links = document.getElementsByTagName( 'a' );
    for ( var i = 0; i < links.length; i++ )
        if ( /(^|\s)link($|\s)/.test( links[i].className ) )
            links[i].href = customTracker_AddRID( links[i].href, cookie );
}
else {
	var rid = customTracker_GetParam( 'rid', window.location.hash.replace(/^#/,'?') );
	
	if ( rid && !readCookie("REFERRAL_ID") ) createCookie( "REFERRAL_ID", rid, 45);
	
	customTracker_ChangeRID();
}
