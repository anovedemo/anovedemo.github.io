
const requirements_query = `
query MyQuery {
  Company {
    get(key: "#arn#") {
      controlframework {
        requirements {
          arn
          name
          summary
        }
        arn
        name
      }
    }
  }
}
`;

var data = [];

async function load_framework_data(){
    if (data.length == 0){
        data = await Draftsman.query(requirements_query.replace("#arn#",Draftsman.fetch_query_parameter("arn")),{},false,true);
        data = data["Company"]["get"]["controlframework"];
    }
}
async function list_requirements(){
    let requirements = {};
    await load_framework_data()
    data.forEach(framework => {
        framework.requirements.forEach(requirement => {
            requirements[requirement.arn] = {
                name: requirement.name,
                framework: framework.name
            };
        });
    });
    return requirements;
}

async function list_frameworks(){
    await load_framework_data()
    return data;
}

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

async function get_frameworks(selected_frameworks){
    let arns = [];
    if (selected_frameworks){
        arns = selected_frameworks.map(x => x.arn);
    }
    let query = document.getElementById("framework-list").innerText;
    let data = await Draftsman.query(query,{},false);
    return data["ControlFramework"]["filter"]["resultset"].filter(x => !arns.includes(x.arn));
}

var periodicity_templates = [];
var periodicity_names = {};

for (i = 1; i < 31; i++){
    let id = i + "D";
    periodicity_templates.push(id);
    periodicity_names[id] = i + " Days"
}
for (i = 1; i < 12; i++){
    let id = i + "M";
    periodicity_templates.push(id);
    periodicity_names[id] = i + " Months"
}
for (i = 1; i < 6; i++){
    let id = i + "Y";
    periodicity_templates.push(id);
    periodicity_names[id] = i + " Years"
}