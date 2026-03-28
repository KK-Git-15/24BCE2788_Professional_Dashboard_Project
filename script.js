/* Theme */

const themeBtn=document.getElementById("themeToggle");

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")
?"dark":"light"

);

};

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

}

/* Sidebar navigation */

const menuItems=
document.querySelectorAll(".sidebar li");

const sections=
document.querySelectorAll(".section");

menuItems.forEach(item=>{

item.onclick=()=>{

menuItems.forEach(i=>
i.classList.remove("active"));

item.classList.add("active");

sections.forEach(sec=>
sec.classList.add("hidden"));

document
.getElementById(item.dataset.section)
.classList.remove("hidden");

};

});

/* Data */

const dashboardData={

followers:12540,

engagement:"78%",

growth:"+12%",

growthData:[2000,3500,5200,7800,10200,12540],

posts:[

{title:"AI Content Post",likes:540,comments:120},

{title:"Travel Reel",likes:430,comments:98},

{title:"Tech Tips",likes:390,comments:75},

{title:"Motivation Post",likes:300,comments:60}

],

scheduled:[

{title:"AI Reel",date:"Mar 30",status:"Scheduled"},

{title:"Tech Carousel",date:"Apr 02",status:"Draft"},

{title:"Travel Post",date:"Apr 05",status:"Scheduled"},

{title:"Product Post",date:"Apr 08",status:"Review"}

],

platforms:[

{name:"Instagram",value:45},

{name:"YouTube",value:30},

{name:"Twitter",value:15},

{name:"LinkedIn",value:10}

],

monthlyEngagement:[

1200,
1900,
3000,
5000,
4200,
6100

]

};

/* Stats */

followers.innerText=dashboardData.followers;

engagement.innerText=dashboardData.engagement;

growth.innerText=dashboardData.growth;

/* Growth chart */

new Chart(growthChart,{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{

data:dashboardData.growthData,

borderColor:"#3b82f6",

fill:false

}]

}

});

/* Analytics */

totalPosts.innerText=
dashboardData.posts.length;

let totalLikes=0;

let totalComments=0;

dashboardData.posts.forEach(p=>{

totalLikes+=p.likes;

totalComments+=p.comments;

});

avgLikes.innerText=
Math.floor(totalLikes/dashboardData.posts.length);

avgComments.innerText=
Math.floor(totalComments/dashboardData.posts.length);

/* Engagement chart */

new Chart(engagementChart,{

type:"doughnut",

data:{

labels:["Likes","Comments"],

datasets:[{

data:[totalLikes,totalComments],

backgroundColor:["#3b82f6","#22c55e"]

}]

}

});

/* Platform chart */

new Chart(platformChart,{

type:"bar",

data:{

labels:dashboardData.platforms.map(p=>p.name),

datasets:[{

data:dashboardData.platforms.map(p=>p.value),

backgroundColor:"#6366f1"

}]

}

});

/* Monthly trend */

new Chart(monthlyChart,{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{

data:dashboardData.monthlyEngagement,

borderColor:"#22c55e",

fill:false

}]

}

});

/* Posts */

dashboardData.posts
.sort((a,b)=>b.likes-a.likes);

dashboardData.posts.forEach(post=>{

let performance="Low";
let perfClass="low";

if(post.likes>500){

performance="High";
perfClass="high";

}

else if(post.likes>350){

performance="Medium";
perfClass="medium";

}

topPosts.innerHTML+=

`<tr>

<td>${post.title}</td>

<td>${post.likes}</td>

<td>${post.comments}</td>

<td class="${perfClass}">
${performance}
</td>

</tr>`;

});

/* Scheduled */

dashboardData.scheduled.forEach(post=>{

scheduledPosts.innerHTML+=

`<div class="post-card">

<h4>${post.title}</h4>

<p>Date: ${post.date}</p>

</div>`;

});