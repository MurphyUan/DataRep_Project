//import dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

//Initialise Server
const app = express()
//Port Location
const port = 4000

// Allow Server to Run Client & Server at the same time
// app.use(express.static(path.join(__dirname, '../build')));
// app.use('/static', express.static(path.join(__dirname, 'build//static')));

// Project Schema, Format MongoDB information
const projectSchema = new mongoose.Schema({
    name: String,
})

// Story Schema, Format MongoDB information
const storySchema = new mongoose.Schema({
    name: String,
    score: Number,
    column: String,
    project_id: String
})

// Project Model, Import/Export to/from MongoDB
const projectModel = mongoose.model("Project",projectSchema)

// Story Model, Import/Export to/from MongoDB
const storyModel = mongoose.model("Story", storySchema)

// Parse applcation/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

// Parse json
app.use(bodyParser.json())

// Use Cross-Origin Resource Sharing
app.use(cors())

// Avoid CORS Errors when communicating between web applications
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

//Initialise Server to Listen @ localhost:port
app.listen(port, ()=>{
    // Log Action
    console.log(`Server Initialised @ http://localhost:${port}`)
})

//Connect to MongoDB Server through Mongoose
async function connect(){
    // Await Connection to MongoDB Database
    await mongoose.connect("mongodb+srv://root:admin@cluster0.9ryks.mongodb.net/ProjectExample?retryWrites=true&w=majority")
}

//Perform Connection
connect()
    // if successful log to console 
    .then(()=>{
        // Log Action
        console.log("Connected To MongoDB Server")
    })
    // else log error to console
    .catch((error) => {
        // Log Error
        console.log(error)
    })

// Throw id specific data to web @ localhost:port/projects/view/:id
app.get('/projects/:id', (req,res) => {
    // Log Id to screen
    console.log("Singling out: " + req.params.id)
    // Retrieve data relevant to project
    projectModel.findById(req.params.id, (error, result) => {
        // Log Error
        if(error)console.log(error)
        // Send Information
        res.json(result)
    })
})

app.get('/stories/:id', (req,res) => {
    // Log Id to screen
    console.log("Finding Cards Relevant to: " + req.params.id)
    // Retrieve stories relevant to project_id :id
    storyModel.find({project_id : req.params.id}, (error, result) => {
        // Log Error
        if(error)console.log(error)
        // Send Information
        res.json(result)
    })
})

// Throws JSON data to web @ localhost:port/projects/view
app.get('/projects', (req,res) => {
    // Get JSON data from MongoDB
    projectModel.find((error, result) =>{
        // Log Error
        if(error)console.log(error)
        // Send Information
        res.json(result)
    })
})

app.put('/stories/:id', (req,res) => {
    // Log Action
    console.log("Update Story: " + req.params.id)
    // Search MongoDB & update with respect to :id
    storyModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (error,result) => {
            // Log Error
            if(error)console.log(error)
            // Send Information
            res.send(result)
        })
})

// Update Project with respect to Project Id
app.put('/projects/:id', (req, res) => {
    // Log Request Parameters
    console.log('Update Project: ' + req.params.id)
    // Search MongoDB & Update with respect to :id
    projectModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (error, result) => {
            // Log Error
            if(error)console.log(error)
            // Send Information
            res.send(result)
        })
})

// Insert New Document to MongoDB Server
app.post('/stories/add', (req,res) => {
    // Log Action
    console.log("New Story: " + req.body.story)
    // Insert new document
    storyModel.create({
        name: req.body.story,
        score: req.body.score,
        progress: req.body.progress,
        project_id: req.body.pId
    })
})

// Recieve JSON data from post request @ localhost:port/projects/add
app.post('/projects/add', (req, res) => {
    // Log Request Parameters
    console.log("New Project: " + req.body.name)
    // Add new document to MongoDB
    projectModel.create({
        name: req.body.name
    })
})

app.delete('/stories/:id', (req,res) => {
    // Log Action
    console.log("Delete Story: " + req.params.id)
    // Delete Story
    storyModel.findByIdAndDelete(req.params.id, (error, result) => {
        // Log Error
        if(error)console.log(error)
        // Send Information
        res.send(result)
    })
})

// Delete For Project
app.delete('/projects/:id', (req, res) => {
    // Log Action
    console.log("Delete Project: " + req.params.id)
    // Search Stories for all Stories with regards to Project and Delete
    storyModel.deleteMany({ project_id: req.params.id}, (error, result)=> {
        // Log Error
        if(error)console.log(error)
        // Send Information
        res.send(result)
    })
    // Delete Project
    projectModel.findByIdAndDelete(req.params.id, (error, result) => {
        // Log Error
        if(error)console.log(error)
        // Send Information
        res.send(result)
    })
})

// Default File Location, Displays @ localhost:port
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/../build/index.html'));
// });