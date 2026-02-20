let projects = JSON.parse(localStorage.getItem("projects")) || [];

const container = document.getElementById("projectsContainer");

function save(){
localStorage.setItem("projects", JSON.stringify(projects));
updateStats();
}

function showDashboard(){
document.getElementById("dashboardView").style.display="block";
document.getElementById("projectsView").style.display="none";
updateStats();
}

function showProjects(){
document.getElementById("dashboardView").style.display="none";
document.getElementById("projectsView").style.display="block";
renderProjects();
}

function addProject(){
const name=document.getElementById("projectName").value.trim();
if(!name) return;

projects.push({name:name, tasks:[]});
document.getElementById("projectName").value="";
save();
renderProjects();
}

function addTask(index){
const input=document.getElementById("taskInput"+index);
const taskName=input.value.trim();
if(!taskName) return;

projects[index].tasks.push({name:taskName, status:"To Do"});
input.value="";
save();
renderProjects();
}

function changeStatus(pIndex,tIndex){
const task=projects[pIndex].tasks[tIndex];
if(task.status==="To Do") task.status="In Progress";
else if(task.status==="In Progress") task.status="Done";
else task.status="To Do";
save();
renderProjects();
}

function deleteProject(index){
projects.splice(index,1);
save();
renderProjects();
}

function renderProjects(){
container.innerHTML="";

projects.forEach((project,pIndex)=>{

const div=document.createElement("div");
div.className="project-card";

let completed=project.tasks.filter(t=>t.status==="Done").length;
let total=project.tasks.length;
let percent=total? (completed/total)*100 : 0;

div.innerHTML=`
<h3>${project.name}</h3>
<button onclick="deleteProject(${pIndex})">Delete</button>

<div>
<input type="text" id="taskInput${pIndex}" placeholder="New Task">
<button onclick="addTask(${pIndex})">Add</button>
</div>

<div class="progress-bar">
<div class="progress" style="width:${percent}%"></div>
</div>

<div>
${project.tasks.map((task,tIndex)=>`
<div class="task">
<span>${task.name}</span>
<button onclick="changeStatus(${pIndex},${tIndex})">
${task.status}
</button>
</div>
`).join("")}
</div>
`;

container.appendChild(div);

});
updateStats();
}

function updateStats(){
let totalProjects=projects.length;
let totalTasks=0;
let completedTasks=0;

projects.forEach(p=>{
totalTasks+=p.tasks.length;
completedTasks+=p.tasks.filter(t=>t.status==="Done").length;
});

document.getElementById("totalProjects").textContent=totalProjects;
document.getElementById("totalTasks").textContent=totalTasks;
document.getElementById("completedTasks").textContent=completedTasks;
}

updateStats();
renderProjects();
