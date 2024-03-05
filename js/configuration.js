var api_url = "";
var api_ws = "";
var api_key = "";

if (!localStorage["staging-environment"] || localStorage["staging-environment"] == "false"){
	console.log("Connected to staging")
	localStorage["aws-congnito-user-pool-id"] = "eu-central-1_yVRR5Nfwu";
	localStorage["aws-congnito-app-id"] = "6b6f0coen990gmbd36be45nlqu";
	localStorage["aws-congnito-ui"] = "https://demo-staging.auth.eu-central-1.amazoncognito.com";	api_url = "https://pcvj26uqyveutmhjlr6aklchuu.appsync-api.eu-central-1.amazonaws.com/graphql";
	api_ws = "wss://pcvj26uqyveutmhjlr6aklchuu.appsync-realtime-api.eu-central-1.amazonaws.com/graphql";
	api_key = "da2-awjw7uh72jhahh74gnkc7nlmsm";
}