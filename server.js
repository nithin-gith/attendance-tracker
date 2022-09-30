const express = require('express')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 5001

const Student = require('./models/student')


//connecting to db
mongoose.connect(process.env.URI,
    ()=>console.log('Connected to DB'), 
    (err)=>console.log(err)
)

// home route (not required)
app.get('/', (req, res) => {
    res.send('<h1>This is an attendance Tracker API</h1>')
})

// to add the student to the database
app.post('/add',(req,res)=>{
    const student = new Student(req.body)
    student.save()
    .then((data)=>{
        res.send(data)
        console.log('success')
    })
    .catch(err=>res.status(500).json({ success: false, msg: `Something went wrong. ${err}` }))
})


// to delete a particular student from the database
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    Student.findByIdAndDelete(id)
    .then((data)=>{
        res.send(data)
        console.log(data)
        console.log('Deleted successfully!')
    })
    .catch(err=>res.status(500).json({ success: false, msg: `Something went wrong. ${err}` }))
})




// to update the attendance of a particular student 
// req body is information whether the student is present or absent
// for ex: {present:true} or {present:false}

app.post('/markattendance/:id',(req,res)=>{
    const id = req.params.id
    const present = req.body.present
    Student.findById(id)
    .then((data)=>{
        if(present){
            data.present += 1
        }else{
            data.absent += 1
        }
        Student.updateOne({_id:id},data)
        .then(()=>{res.status(200).json({ success: true, msg: `Updated successfully!` });console.log('Updated successfully!')})
        .catch(err=>{res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });return})
    })
    .catch(err=>res.status(500).json({ success: false, msg: `Something went wrong. ${err}` }))
})


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})