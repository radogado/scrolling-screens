
var tracker_download_files;

(function () {
    $(document).ready( function () {
        var where = $('#content_center');
        where
            .find( 'a[href$="://' + tracker_download_files.host + '/merchant/' + tracker_download_files.lang + '/moneybookers_gateway_manual.pdf"]' )
            .bind( 'click', function () { return customTracker_Event( 'Ecom manual', 'Download', 'Merchant Gateway ' + tracker_download_files.lang.toUpperCase() ); } )
        ;
        where
            .find( 'a[href$="://' + tracker_download_files.host + '/merchant/' + tracker_download_files.lang + '/automated_payments_interface_manual.pdf"]' )
            .bind( 'click', function () { return customTracker_Event( 'Ecom manual', 'Download', 'Merchant API ' + tracker_download_files.lang.toUpperCase() ); } )
        ;
    } );
})();
