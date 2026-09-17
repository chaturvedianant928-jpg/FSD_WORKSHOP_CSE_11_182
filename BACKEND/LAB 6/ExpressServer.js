import express from "express";
import cors from "cors";
const port=3000;
const app=express();
app.use(cors());
app.use(express.json());
const userData=[
    {id: 101,
    name:"cm",
    email:"cmrj88@gmail.com"
    },
{
    id:102,
    name:"as",
    email:"mail.anant260@gmail.com"
},
];
app.get("/",(req,res)=>{
res.status(200).json({
    message:"Welcome user",
    });   
});
app.get("/user/:id",(req,res)=>{
    try{
        const id=req.params.id;
        const user=userData.find((u)=>u.id==id);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json({message:"user found",user});
    }
    catch(err){
        console.error("error",err.message);
    }
});
app.get("/user",(req,res)=>{
try{
    res.status(200).json({message:"data recieved",userData});
    }
catch(err){
console.error("error",err.message);
}
});
app.post("/create",(req,res)=>{
    try{
    const{name,email}=req.body;
    const newUser={
        id:userData.length+1,
        name,
        email,
    };
    userData.push(newUser);
    res.status(201).json({message:"user created",newUser});
    } catch(err){
        console.error("error",err.message);
    }
});
app.put("/edit/:id",(req,res)=>{
    try{
        const id=req.params.id; 
        const{name,email}=req.body;
        const index=userData.findIndex((u)=>u.id==id);
        if(index===-1){
            return res.status(404).json({message:"user not found"});
        }
        userData[index]={
            id,
            name,
            email,
        };
       return res.status(200).json({message:"user updated succesfully",user : userData[index]});
    }
    catch(err){
        console.error("error",err.message);
    }
});
app.post("/login", (req, res) => {
    try {
        const { email } = req.body;
        const user = userData.find((u) => u.email === email);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ message: "login successful", user });
    } catch (err) {
        console.error("error", err.message);
    }
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});