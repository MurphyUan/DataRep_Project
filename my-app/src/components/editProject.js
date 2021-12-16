// Import Local Dependencies
import React, { Component } from 'react'
import axios from 'axios'

// Edit Existing Project
export class EditProject extends Component{
    constructor(){
        super()
        // Submit Edits made to Project
        this.SubmitEdit = this.SubmitEdit.bind(this)
        // Data Binding
        this.onChangeName = this.onChangeName.bind(this)
    }

    // Insert values with respect to Project we want to edit
    componentDidMount(){
        // Log the ID of the project document
        console.log(this.props.match.params.id)
        // Request information from the MongoDB server
        axios.get('http://localhost:4000/projects/' + this.props.match.params.id)
        .then((result) => {
            // Log the resulting data
            console.log(result.data)
            // Update the state of ProjectEdit
            this.setState({
                name: result.data.name,
                _id: result.data._id
            })
        })
        // Catch any and all errors flying from request
        .catch((error) => {
            console.log(error)
        })
    }

    // Data Bind Name
    onChangeName(element){
        this.setState({
            name: element.target.value
        })
    }

    // Data Bind Submission process
    SubmitEdit(element){
        element.preventDefault()

        // New Project Object
        const newProject = {
            name: this.state.name,
            _id: this.state._id
        }

        // Throw Updated values of Project to MongoDB Server
        axios.put('http://localhost:4000/projects/' +this.state._id, newProject)
        .then((result) => {
            console.log(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <div className='App'>

            </div>
        )
    }
}