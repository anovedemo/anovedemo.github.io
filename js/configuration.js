var api_url="";
var api_ws="";
var api_key="";
if(!localStorage["staging-environment"]||localStorage["staging-environment"]=="false"){
  console.log("Connected to production")
  localStorage["aws-congnito-user-pool-id"] = "eu-central-1_Cyyh4oLjM";
  localStorage["aws-congnito-app-id"] = "2v1p8l7rdjv7ctn9hnj01rssim";
  api_url = "https://xsjdrhw47vcepbvy2byajsi3hq.appsync-api.eu-central-1.amazonaws.com/graphql";
  api_ws = "wss://xsjdrhw47vcepbvy2byajsi3hq.appsync-realtime-api.eu-central-1.amazonaws.com/graphql";
  api_key = "da2-mpwfe2yc2nf5hiibmuelsssigm";
}
