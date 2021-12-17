// Import local dependencies
import axios from 'axios'
import React, { Component } from 'react'
import { Project } from './project'
import { CreateProjectPopup } from './createProject'

// Home Class
export class View extends Component{
    // Home constructor
    constructor(){
        super()
        // Bind Method to Home Class / Instance of Object
        this.RefreshInfo = this.RefreshInfo.bind(this)
    }
    // Home state, stores component data
    state = {
        projects: []
    }
    // Listen for Connection
    componentDidMount(){
        this.RefreshInfo()
    }

    RefreshInfo(){
        // Perform get request to server
        axios.get('http://localhost:4000/projects')
        // Listen for Completion
        .then((result)=>{
            // Update state variable
            this.setState({ projects: result.data})
        })
        // Listen for Error
        .catch((error) => {
            // Log Error
            console.log(error)
        })
    }

    render(){
        //return HTML
        return (
            <div>
                <CreateProjectPopup/>
                <br/>
                <Project projects={this.state.projects} ReloadPage={this.RefreshInfo}></Project>
            </div>
        )
    }
}