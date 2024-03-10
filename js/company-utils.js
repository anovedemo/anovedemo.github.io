
const query_string = `
query Search($searchString: String = "") {
  Profile {
    search(searchString: $searchString) {
      firstName
      lastName
      username
    }
  }
}
`

async function search_users(search_string){
    let data = await Draftsman.query(query_string,{searchString: search_string},false);
    return data["Profile"]["search"];
}

async function prepare_employee_arn(company,email){
    let data = await Draftsman.query(query_string,{searchString: email},false);
    data = data["Profile"]["search"];
    if (data.length != 0){
        return data[0];
    } else {
        return company.arn + ':employee:' + email;
    }
}