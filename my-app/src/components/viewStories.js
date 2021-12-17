// Import local dependencies
import axios from 'axios'
import React, { Component } from 'react'
import { Story } from './story'
import { CreateStoryPopup } from './createStory'
import { EditProjectPopup } from './editProject';

export class ViewStories extends Component{
    constructor(){
        super()
        // Bind Method to Class
        this.ReloadData = this.ReloadData.bind(this)
        this.GetProjectDetails = this.GetProjectDetails.bind(this)
    }

    // New State Variable
    state = {
        stories: [],
        id: '',
        name: ''
    }

    // Listen For Change / Connection
    componentDidMount(){
        this.ReloadData()
        this.GetProjectDetails()
    }


    // Refresh Page
    ReloadData(){
        console.log(this.props.match.params.id)
        // Perform get request to server
        axios.get('http://localhost:4000/stories/' + this.props.match.params.id)
            // Listen for Completion
            .then((result) => {
                // Check if result is in dataformat we want
                console.log(result)
                // Validate Data
                if(result.data != undefined){
                    // Update state variable
                    this.setState({ 
                        stories: result.data
                    })
                }
                
            })
            // Listen for Error
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    }

    GetProjectDetails(){
        axios.get('http://localhost:4000/projects/' + this.props.match.params.id)
            // Listen for Completion
            .then((result) => {
                // Log Result
                console.log(result.data)
                // Update State
                this.setState({
                    id: result.data._id,
                    name: result.data.name
                })
            })
            // Listen For Errors
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                {/* Edit Screen For Project */}
                <EditProjectPopup _id={this.state.id} name={this.state.name}/>
                <br/>
                {/* Add New Story Screen */}
                <CreateStoryPopup id={this.props.match.params.id}/>
                <br/>
                {/* List of stories associated with Project */}
                <Story stories={this.state.stories} ReloadData={this.ReloadData}/>
                
            </div>
        )
    }
}