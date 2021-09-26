require('dotenv').config()
const express = require('express')
const app = express();
const path=require('path')
const hbs = require('hbs')
const port = process.env.PORT || 8000;
const requests = require('requests')
const api = process.env.API_key
const contact_collection = require('../src/db')

const view_path = path.join(__dirname,'../views')
const static_path = path.join(__dirname,"../public")
const partials = path.join(__dirname,'../partials')

app.set('view engine','hbs')
app.set('views',view_path)
hbs.registerPartials(partials)
app.use(express.static(static_path))
app.use(express.json())

app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/news",(req,res)=>{
    res.render('news')
})

app.post('/get_news',(req,res)=>{
    const {country,category} = req.body
    var url = "https://newsapi.org/v2/top-headlines?category="+category+"&country="+country+"&apiKey="+api
    try{
        requests(url)   
        .on('data', function (chunk) {
                const obj = JSON.parse(chunk);
                res.json(obj)   
        })
    }
    catch(err){
        res.status(400).json(err)
    }
})

app.get("/contact",(req,res)=>{
    res.render('contact')
})

app.post("/contact",async(req,res)=>{
    const {name,email,subject,message} = req.body
    if (!name || !subject || !email || !message )
    {
        return res.status(422).json({
            status:422,
            message:"Fill the form properly"
        })
    }
    try{
        const data = new contact_collection({name,subject,email,message})
        const result = await data.save()
        res.status(200).json({
            status:200,
            message:'data saved successfully'
        })
    }
    catch(err)
    {
        res.status(404).json({
            status:404,
            message:'Some error occured'
        })
    }  
})

app.get("*",(req,res)=>{
    res.render("404error")
})

app.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
})
