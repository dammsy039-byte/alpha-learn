const API_BASE = window.location.hostname==="localhost" ? "http://localhost:3000/api" : "/api";
const subjects=[
{name:"Mathematics",premium:false,questions:[
{q:"What is 12 × 5?",o:["50","60","70","80"],a:1},
{q:"What is 25% of 100?",o:["10","20","25","50"],a:2}]},
{name:"English",premium:false,questions:[
{q:"Choose the noun: The boy ran home.",o:["ran","home","boy","the"],a:2},
{q:"Which word is an adjective?",o:["beautiful","quickly","run","school"],a:0}]},
{name:"Chemistry",premium:true,questions:[
{q:"What is the chemical symbol for oxygen?",o:["O","Ox","C","H"],a:0},
{q:"Water has the formula:",o:["CO2","H2O","O2","NaCl"],a:1}]},
{name:"Physics",premium:true,questions:[
{q:"The SI unit of force is:",o:["Joule","Watt","Newton","Pascal"],a:2},
{q:"Speed is calculated as:",o:["distance ÷ time","time ÷ distance","mass × time","force ÷ mass"],a:0}]}
];
let state=JSON.parse(localStorage.getItem("alphaV16")||'{"name":"Student","email":"","premium":false,"records":[]}');

function persist(){localStorage.setItem("alphaV16",JSON.stringify(state));}
function show(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");if(id==="subjects")renderSubjects();if(id==="account")renderAccount();if(id==="premium")renderPremium();}
function renderSubjects(){
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 document.getElementById("subjectsGrid").innerHTML=subjects.filter(s=>s.name.toLowerCase().includes(q)).map((s,i)=>`
 <div class="card ${s.premium&&!state.premium?"locked":""}">
 <span class="tag">${s.premium?"⭐ Premium":"Free"}</span><h3>${s.name}</h3>
 <p>${s.premium&&!state.premium?"Premium access required.":"Practice two questions in this demo."}</p>
 <button class="${s.premium&&!state.premium?"secondary":"primary"}" onclick="openQuiz(${i})">${s.premium&&!state.premium?"View Premium":"Start Quiz"}</button>
 </div>`).join("");
}
function openQuiz(i){if(subjects[i].premium&&!state.premium){show("premium");return}show("quiz");document.getElementById("quizTitle").textContent=subjects[i].name+" Quiz";document.getElementById("quizBox").innerHTML=subjects[i].questions.map((q,n)=>`<div class="card"><h3>${n+1}. ${q.q}</h3>${q.o.map((o,j)=>`<button class="option" onclick="answer(this,${i},${n},${j})">${o}</button>`).join("")}<p id="f${n}"></p></div>`).join("")}
function answer(btn,si,qi,oi){if(btn.dataset.done)return;btn.dataset.done="1";let good=oi===subjects[si].questions[qi].a;btn.classList.add(good?"correct":"wrong");document.getElementById("f"+qi).textContent=good?"Correct!":"Not correct.";state.records.push({subject:subjects[si].name,correct:good,date:new Date().toISOString()});persist();renderAccount();}
function renderPremium(){document.getElementById("planStatus").textContent=state.premium?"You are on the Premium demo plan.":"You are currently on the Free plan.";document.getElementById("premiumBtn").disabled=state.premium;document.getElementById("premiumBtn").textContent=state.premium?"Premium Active":"Activate Demo Premium";}
function activateDemo(){if(confirm("This is a demo. No money will be charged. Activate Premium?")){state.premium=true;persist();renderPremium();renderSubjects();renderAccount();}}
function renderAccount(){document.getElementById("statName").textContent=state.name||"Student";document.getElementById("statAttempts").textContent=state.records.length;document.getElementById("statPlan").textContent=state.premium?"Premium":"Free";document.getElementById("name").value=state.name||"";document.getElementById("email").value=state.email||"";}
function saveProfile(){state.name=document.getElementById("name").value.trim()||"Student";state.email=document.getElementById("email").value.trim();persist();renderAccount();document.getElementById("syncStatus").textContent="Profile saved on this device. Connect the backend for online account storage.";}
renderSubjects();renderAccount();renderPremium();