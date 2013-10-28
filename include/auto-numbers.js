var elements = document.getElementsByTagName( '*' );
for ( var i = 0; i < elements.length; i++ ) {
    if ( elements[i].className == 'number_users' ) elements[i].innerHTML = '20';
    if ( elements[i].className == 'number_users_daily' ) elements[i].innerHTML = '15';
    if ( elements[i].className == 'number_options' ) elements[i].innerHTML = '100';
    if ( elements[i].className == 'number_countries' ) elements[i].innerHTML = '200';
    if ( elements[i].className == 'number_merchants' ) elements[i].innerHTML = '100';
    if ( elements[i].className == 'number_curencies' ) elements[i].innerHTML = '41';
    if ( elements[i].className == 'number_currencies' ) elements[i].innerHTML = '41';
    if ( elements[i].className == 'number_languages' ) elements[i].innerHTML = '12';
}
