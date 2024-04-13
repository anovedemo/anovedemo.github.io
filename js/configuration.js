var api_url = "";
var api_ws = "";
var api_key = "";
var bucket = "";
var stage = ""

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to production");
	stage = "production";
	bucket = "d33lj2wpoi7g8j.cloudfront.net";
	localStorage["aws-congnito-user-pool-id"] = "eu-central-1_Cyyh4oLjM";
	localStorage["aws-congnito-app-id"] = "2v1p8l7rdjv7ctn9hnj01rssim";
	localStorage["aws-congnito-ui"] = "https://demo-production.auth.eu-central-1.amazoncognito.com";	api_url = "https://xsjdrhw47vcepbvy2byajsi3hq.appsync-api.eu-central-1.amazonaws.com/graphql";
	api_ws = "wss://xsjdrhw47vcepbvy2byajsi3hq.appsync-realtime-api.eu-central-1.amazonaws.com/graphql";
	api_key = "da2-mpwfe2yc2nf5hiibmuelsssigm";
}