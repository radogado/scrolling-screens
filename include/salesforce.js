function init() {
	if ( location.href.split('?')[1] == "thankyou" ) {
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id','thankyou');
		newdiv.innerHTML = '<span><a>&#8730;</a> Thank you for registering!<br><a>&#8594;</a> Click anywhere to continue.</span>';
		document.body.appendChild(newdiv);
		document.getElementById('thankyou').onmouseup = function () { document.getElementById('thankyou').style.display = 'none'; };
	}
}

window.onload = init;

function check_partner_form() {

	var mandatory = "";
	var nameFilter = /^[a-zA-Z\xc0-\xff\-\.\']{2,}|[a-zA-Z\xc0-\xff\-\.\']{2,}[\s][a-zA-Z\xc0-\xff\-\.\']{2,}$/;
	var emailFilter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var urlFilter = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
	var phoneFilter = /^\+?[\d\s]+\(?[\d\s]{10,}$/;
	
	if (!(document.getElementById('URL').value) || !(urlFilter.test(document.getElementById('URL').value))) { 
		mandatory = mandatory + " " + document.getElementById('URL_label').innerHTML.replace(':', '') + "\n"; 
		document.getElementById('URL').style.backgroundColor = '#bec8da'; 
		document.getElementById('URL_label').style.color = '#ffd964'; 
		document.getElementById('URL_label').innerHTML = 'Type valid website address';
		document.getElementById('URL').focus();
	} 
	else { 
		document.getElementById('URL').style.backgroundColor = '#fff'; 
		document.getElementById('URL_label').style.color = '#eee'; 
		document.getElementById('URL_label').innerHTML = 'Website';
	}

	if (!(document.getElementById('email').value) || !(emailFilter.test(document.getElementById('email').value))) { 
		mandatory = mandatory + " " + document.getElementById('email_label').innerHTML.replace(':', '') + "\n";
		document.getElementById('email').style.backgroundColor = '#bec8da'; 
		document.getElementById('email_label').style.color = '#ffd964'; 
		document.getElementById('email_label').innerHTML = 'Type valid Email address';
		document.getElementById('email').focus();
	} 
	else { 
		document.getElementById('email').style.backgroundColor = '#fff'; 
		document.getElementById('email_label').style.color = '#eee'; 
		document.getElementById('email_label').innerHTML = 'Email';
	}

	if (!(document.getElementById('last_name').value) || !(nameFilter.test(document.getElementById('last_name').value))) { 
		mandatory = mandatory + " " + document.getElementById('last_name_label').innerHTML.replace(':', '') + "\n";
		document.getElementById('last_name').style.backgroundColor = '#bec8da'; 
		document.getElementById('last_name_label').style.color = '#ffd964'; 
		document.getElementById('last_name_label').innerHTML = 'Type valid name';
		document.getElementById('last_name').focus();
	} 
	else {
		document.getElementById('last_name').style.backgroundColor = '#fff';
		document.getElementById('last_name_label').style.color = '#eee'; 
		document.getElementById('last_name_label').innerHTML = 'Name';
	}

	if (!mandatory) { // good to submit
		// prepare retURL - the url which salesforce opens after processing the submit - with user data
	    document.getElementById('retURL').value = location.href + "?thankyou";
	    return true;
	}

    return false; // abort submit
}
