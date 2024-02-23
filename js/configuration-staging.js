if (localStorage["staging-environment"] && localStorage["staging-environment"] == "true"){
	console.log("Connected to staging")
	localStorage["aws-congnito-user-pool-id"] = "eu-central-1_yVRR5Nfwu";
	localStorage["aws-congnito-app-id"] = "3s8u869v3o71l5kthvkfnqlbpo";
	api_url = "https://pcvj26uqyveutmhjlr6aklchuu.appsync-api.eu-central-1.amazonaws.com/graphql";
	api_ws = "wss://pcvj26uqyveutmhjlr6aklchuu.appsync-realtime-api.eu-central-1.amazonaws.com/graphql";
	api_key = "da2-awjw7uh72jhahh74gnkc7nlmsm";
}