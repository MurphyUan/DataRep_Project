// Import local dependencies
import axios from 'axios'
import React, { Component } from 'react'
import { Project } from './project'
import { CreateProjectPopup } from './popups'

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
        .then((res)=>{
            this.setState({ projects: res.data})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        //return HTML
        return (
            <div>
                <Project listProjects={this.state.projects} ReloadPage={this.RefreshInfo}></Project>
                <CreateProjectPopup/>
            </div>
        )
    }
}