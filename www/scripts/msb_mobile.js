$(function() {
	document.addEventListener("deviceready", HssMobile.onDeviceReady, false);

	$(document).bind("pagebeforechange", function(e, data) {
		if (typeof data.toPage === "string") {
			var u = $.mobile.path.parseUrl(data.toPage)

			var match;
			var pl = /\+/g; // Regex for replacing addition symbol with a space
			var search = /([^&=]+)=?([^&]*)/g
			var decode = function(s) {
				return decodeURIComponent(s.replace(pl, " "));
			};
			var query = u.search.substring(1);

			while (match = search.exec(query))
				HssMobile.urlParams[decode(match[1])] = decode(match[2]);

			//if (u.filename === "account_details.html") {
				//HssMobile.initAccountDetails(HssMobile.urlParams.sid);
			//}
		}
	});
});

var HssMobile = {
	urls : {
		quick_deposit_confirm : "quick_deposit_confirm.html"
	},
	onDeviceReady : function() {
		navigator.network.isReachable('phonegap.com', reachableCallback);
	},
	reachableCallback : function(reachability) {
		// There is no consistency on the format of reachability
		var networkState = reachability.code || reachability;
		var states = {};
		states[NetworkStatus.NOT_REACHABLE] = 'No network connection';
		states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
		states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';
		alert('Connection type: ' + states[networkState]);
	},
	urlParams : {},
	quickDepositAmounts : {
		1 : {
			Amount : 10
		},
		2 : {
			Amount : 20
		},
		3 : {
			Amount : 30
		}
	},
	accounts : {
		4 : {
			Name : "Johnny Walker",
			Balance : -3.75,
			School : "Springdale High School",
			StudentId : 123456789
		},
		2 : {
			Name : "Bonnie Walker",
			Balance : 15.50,
			School : "Springdale Junion High",
			StudentId : 987654321
		},
		3 : {
			Name : "Grace Walker",
			Balance : 32.25,
			School : "Springdale Elementary",
			StudentId : "ABLC-108s0"
		},
		1 : {
			Name : "Sam Walker",
			Balance : 34.25,
			School : "Springdale Elementary",
			StudentId : "abv30acls"
		}
	},
	initAccountDetails : function(sid) {
		$("#student_name").text(accounts[sid].Name);
		$("#student_school").text(accounts[sid].School);
		$("#student_balance").text("$" + accounts[sid].Balance);
		$("#student_id").text("ID#" + accounts[sid].StudentId);

		var links = "";
		$
				.each(
						quickDepositAmounts,
						function(i, item) {
							link += '<a href="'
									+ HssMobile.urls.quick_deposit_confirm
									+ '?amount='
									+ item.Amount
									+ '&sid='
									+ sid
									+ '" data-rel="dialog" data-role="button" data-inline="true">$'
									+ item.Amount + '</a>'
						});

		$("#quickDepositLinks").empty().prepend(links);
	}
}