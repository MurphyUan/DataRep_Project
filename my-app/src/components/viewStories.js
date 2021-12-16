// Import local dependencies
import axios from 'axios'
import React, { Component } from 'react'
import { Project } from './project'
import { CreateProjectPopup } from './createProject'

export class ViewStories extends Component{
    constructor(){
        super()
        // Bind Method to Class
        this.ReloadData = this.ReloadData.bind(this)
    }

    // New State Variable
    state = {
        stories: []
    }

    // Listen For Change / Connection
    componentDidMount(){
        this.ReloadData()
    }

    // Refresh Page
    ReloadData(){
        // Perform get request to server
        axios.get('http://localhost:4000/project/' + this.props.project.id)
            // Listen for Completion
            .then((result) => {
                // Update state variable
                this.setState({ stories: result.data})
            })
            // Listen for Error
            .catch((error) => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                <Story stories={this.state.stories} ReloadData={this.ReloadData}/>
            </div>
        )
    }
}