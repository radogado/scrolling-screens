
var tracker_internal_links;

(function () {
    var page_handlers = {
        'index': function () {
            var places =
            {
                'logo':      '#header h1',
                'header':    ['#top_nav1','#nav_bar'],
                'tabs':      '#TopNav',
                'cta':       '#header_home',
                'everyone':  '#home_center .home_center_content',
                'webshops':  '#home_right .home_right_content',
                'footer':    ['#footer','.smallprint'],
                'promotion': '#promo'
            };
            var config =
            {
                'logo': {
                    '': 'home'
                },
                'header': {
                    '':                   'home',
                    'help.pl?s=fees':     'fees',
                    'help.pl?s=benefits': 'benefits',
                    'help.pl?s=contact':  'contact',
                    'faq.pl':             'faq'
                },
                'tabs': {
                    'send.pl':       'send_money',
                    'directory.pl':  'shopping',
                    'messaging.pl':  'services',
                    'my_account.pl': 'my_account',
                    'upload.pl':     'upload_funds',
                    'download.pl':   'withdraw'
                },
                'cta': {
                    'register.pl': 'register',
                    'login.pl':    'login'
                },
                'everyone': {
                    'help.pl?s=auction':    'auction_payments',
                    'help.pl?s=instant':    'instant_payments',
                    'help.pl?s=fees:left':  'low_prices',
                    'help.pl?s=fees:right': 'worldwide',
                    'p2p/sender.pl':        'p2p_send_money',
                    'help.pl?s=easy':       'easy_to_use',
                    'referral.pl':          'earn_money',
                    'help.pl?s=tour':       'take_a_tour',
                    'register.pl':          'sign_up_now'
                },
                'webshops': {
                    'help.pl?s=m_fraudcontrol': 'no_chargebacks',
                    'help.pl?s=m_gateway_demo': 'instant_payments',
                    'help.pl?s=m_fees':         'low_costs',
                    'help.pl?s=fees':           'local_payments',
                    'directory.pl':             'reference_customers',
                    'help.pl?s=m_shoppingcart': 'accept_cards',
                    'help.pl?s=merchant':       'find_out_more'
                },
                'footer': {
                    'help.pl?s=aboutus':         'about_us',
                    'help.pl?s=fsa':             'fsa',
                    'help.pl?s=laundering':      'mla',
                    'help.pl?s=privacy':         'privacy',
                    'help.pl?s=terms':           'tscs',
                    'help.pl?s=terms:text':      'text_tscs',
                    'faqmessaging.pl':           'customer_service',
                    'help.pl?s=ecrcpr':          'ec_directive'
                },
                'promotion': {
                    'send-money/': 'banner'
                }
            };

            var ctx_func = function ( name ) {
                var selector = places[name];
                if ( typeof(selector) != 'string' ) selector = jQuery.map(selector,function(a){return a+' a';}).join(',');
                else selector = selector+' a';
                $(selector).bind('click',function(){
                    var href = this.href;
                    href = href.replace(/^https?:\/\//i,'').replace(tracker_internal_links.host,'').replace(/^\/*((app|mbj\/[a-z]+)\/*)?/i,'');

                    if ( name == 'promotion' ) { href = 'send-money/' }
                    else if ( name == 'everyone' && href == 'help.pl?s=fees' ) { href += ':' + this.className; }
                    else if ( name == 'footer' && href == 'help.pl?s=terms' && !/\[/.test(this.innerHTML) ) { href += ':' + 'text' }

                    var section_config = config[name];
                    if ( typeof(section_config[href]) != 'undefined' ) href = section_config[href];

                    customTracker_Page( '/internal-links/mb/' + tracker_internal_links.lang + '/homepage/' + name + '/' + href );

                    return href == 'take_a_tour' ? false : true;
                });
            };

            for ( var name in places ) {
                ctx_func(name);
            }

            return true;
        }
    };
    var page_handler = 'page_handlers["' + tracker_internal_links.page + '"]';
    try {
        eval( '$(document).ready( function () { ' + page_handler + '(); } );' );
    } catch (err) {};
})();
