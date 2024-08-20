if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging");
	stage = "staging";
	bucket = "d1q7yh8ptqll67.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-central-1_uuHSEmH2u";
	localStorage["aws-congnito-app-id"] = "44brha1iii21m05cnfuirjgpk9";
	localStorage["aws-congnito-ui"] = "https://demo-staging.auth.eu-central-1.amazoncognito.com";	api_url = "https://74x7ny2cdnextpjgrurrfumioe.appsync-api.eu-central-1.amazonaws.com/graphql";
	api_ws = "wss://74x7ny2cdnextpjgrurrfumioe.appsync-realtime-api.eu-central-1.amazonaws.com/graphql";
	api_key = "da2-c6ic4msw5jfahnhujtlw6p4lyu";
}
