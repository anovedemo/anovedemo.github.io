if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d2hdlsuega09u0.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-central-1_uuHSEmH2u";
	localStorage["aws-congnito-app-id"] = "4qnci61idr6j984ek5hdae5k9u";
	localStorage["aws-congnito-ui"] = "https://demo-staging.auth.eu-central-1.amazoncognito.com";	api_url = "https://i625il2os5aaxbtfcighadwpwm.appsync-api.eu-central-1.amazonaws.com/graphql";
	api_ws = "wss://i625il2os5aaxbtfcighadwpwm.appsync-realtime-api.eu-central-1.amazonaws.com/graphql";
	api_key = "da2-ya36ehmoujaenbmzixgvhtivce";
}