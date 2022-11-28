require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker');
const app = express()
const cors = require('cors');
const reportModel = require('./reportScheme');

app.use(cors({origin:"*"}))
app.use(express.urlencoded({ extended: true }))

async function connectToDB(){
    try{
        mongoose.connect('mongodb+srv://IbrahimSaffi:jmk161651@cluster0.231aux9.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to DB")
    }
    catch(e){
     console.error("Error", err)
    }

}
async function saveDataDB(){
    for(let i=0;i<100;i++){
       let date = faker.date.recent(5)
       let doctorName = faker.name.fullName()
       let patientName = faker.name.fullName()
       let rating = faker.datatype.number({max:5,min:1})
       const newReport = new reportModel({date:date.toDateString(),doctorName,patientName,rating})
       try{
        await newReport.save()
       }
       catch(e){
         console.log(e)
       }
    }
}
async function getData(){
   let reportsPerDay = []
   let currDate = new Date("2022-11-01T00:00:00.709+00:00")
   for( let i=0;i<=5;i++){
      let nextDate = new Date() 
       nextDate.setDate(currDate.getDate()+1)
       let numOfReports = await reportModel.countDocuments({date: {$gte:currDate,$lt:nextDate}})
       reportsPerDay.push(numOfReports)
       currDate.setDate(currDate.getDate()+1)
   }
   return reportsPerDay
}
app.get("/",async (req,res)=>{
       await saveDataDB()
    let reportsPerDay = await getData()
    res.status(200).send({reportsPerDay})
})
connectToDB()
app.listen(process.env.PORT || 8000)

