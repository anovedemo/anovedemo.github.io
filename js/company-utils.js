
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
    console.log(data);
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

function prepare_arn(parent,path,child){
    return parent + ":" + path + ":" + child.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const impact_labels = {
    1: "very low",
    2: "low",
    3: "medium",
    4: "high",
    5: "very high"
}

const likelihood_labels = {
    1: "once every 10 years",
    2: "once every 5 years",
    3: "once every 2 years",
    4: "once a year",
    5: "multiple times a year"
}

const treatment_plan = [
    {type: "avoid", impactDecrease: 0, likelihoodDecrease: 0, description: ""},
    {type: "mitigate", impactDecrease: 0, likelihoodDecrease: 0, description: ""},
    {type: "transfer", impactDecrease: 0, likelihoodDecrease: 0, description: ""},
    {type: "accept", impactDecrease: 0, likelihoodDecrease: 0, description: ""},
];

function is_treatment_plan_sufficient(command){
    let impact = command.grossImpact;
    let likelihood = command.grossLikelihood;
    command.treatmentPlan.forEach(record => {
        impact -= record.impactDecrease;
        likelihood -= record.likelihoodDecrease;
    });
    let report = {
        impact: impact <= command.apetiteImpact,
        likelihood: likelihood <= command.apetiteLikelihood,
        impactDecrease: impact - command.apetiteImpact,
        likelihoodDecrease: likelihood - command.apetiteLikelihood
    };
    console.log(report);
    return report;
}

function get_control_name(company,arn){
    return company.controls.filter(x => x.arn == arn).at(0).name;
}

function frame_impact_on_risk_percentage(command){
    let max_impact = 100;
    command.controlLinks.forEach(x => {
        max_impact -= x.impactOnRisk;
    });
    return max_impact;
}

function sort_treatment_plan(plan){
    let sorted = ["avoid","mitigate","transfer","accept"];
    plan.forEach(a => {
        let index = sorted.indexOf(a.type);
        sorted[index] = a;
    });
    return sorted;
}

function compare_changelog( a, b ) {
  if ( a.timestamp > b.timestamp ){
    return -1;
  }
  if ( a.timestamp < b.timestamp ){
    return 1;
  }
  return 0;
}

function sort_changelog(log){
    log.sort( compare_changelog );
    return log;
}
