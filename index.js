import express from "express";
import multer from "multer";
import path from 'path';

const app = express();
const port = 5000;


const storage = multer.diskStorage({
    destination : function(req , file , cb){
        return cb(null , "./uploads");
    },
    filename : function(req , file , cb){
        return cb(null , `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage});

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.use(express.json());

app.use(express.urlencoded({extended : false}));

app.get("/" , (req ,res)=>{
    // res.send("hello");
    return res.render("homepage");
});

app.post("/upload" , upload.single("profileimage") , (req ,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
});


app.listen(port , ()=>{
    console.log(`App Listen at http://localhost:${port}`)
});


