const express=require("express");
const cors=require("cors");
const crypto=require("crypto");
const fs=require("fs");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
const DB=path.join(__dirname,"..","database","db.json");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));

function db(){return JSON.parse(fs.readFileSync(DB,"utf8"))}
function save(x){fs.writeFileSync(DB,JSON.stringify(x,null,2))}
function hash(password){return crypto.createHash("sha256").update(password).digest("hex")}

app.get("/api/health",(req,res)=>res.json({ok:true,version:"v16"}));

app.post("/api/register",(req,res)=>{
 const {name,email,password}=req.body;
 if(!name||!email||!password)return res.status(400).json({error:"name, email and password are required"});
 const d=db();
 if(d.users.some(u=>u.email.toLowerCase()===email.toLowerCase()))return res.status(409).json({error:"Account already exists"});
 const user={id:crypto.randomUUID(),name,email,passwordHash:hash(password),plan:"free",createdAt:new Date().toISOString()};
 d.users.push(user);save(d);
 res.status(201).json({id:user.id,name:user.name,email:user.email,plan:user.plan});
});

app.post("/api/login",(req,res)=>{
 const {email,password}=req.body; const d=db();
 const u=d.users.find(x=>x.email.toLowerCase()===String(email||"").toLowerCase()&&x.passwordHash===hash(String(password||"")));
 if(!u)return res.status(401).json({error:"Invalid email or password"});
 res.json({id:u.id,name:u.name,email:u.email,plan:u.plan});
});

app.get("/api/progress/:id",(req,res)=>{
 const d=db();res.json(d.progress[req.params.id]||{records:[]});
});
app.put("/api/progress/:id",(req,res)=>{
 const d=db();d.progress[req.params.id]=req.body||{records:[]};save(d);res.json(d.progress[req.params.id]);
});

app.get("/api/premium/:id",(req,res)=>{
 const d=db();const u=d.users.find(x=>x.id===req.params.id);
 res.json({plan:u?.plan||"free"});
});

/* Payment integration placeholder.
   Production payments must be created and verified server-side.
   Never put private payment keys in frontend JavaScript. */
app.post("/api/payment/create",(req,res)=>{
 res.status(501).json({error:"Payment provider not connected yet",next:"Connect a real provider and verify webhooks on the server."});
});

app.post("/api/payment/webhook",(req,res)=>{
 res.status(501).json({error:"Webhook placeholder. Verify provider signature before updating subscriptions."});
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"..","public","index.html")));
app.listen(PORT,()=>console.log("Alpha Learn v16 running on port "+PORT));