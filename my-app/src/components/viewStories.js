// Import local dependencies
import axios from 'axios'
import React, { Component } from 'react'
import { Story } from './story'
import { CreateStoryPopup } from './createStory'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { EditProjectPopup } from './editProject';

export class ViewStories extends Component{
    constructor(){
        super()
        // Bind Method to Class
        this.ReloadData = this.ReloadData.bind(this)
        this.savedState = ''
    }

    // New State Variable
    state = {
        stories: [],
    }

    // Listen For Change / Connection
    componentDidMount(){
        this.ReloadData()
    }

    Run = () => {
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

    render(){
        return(
            <div>
                <EditProjectPopup id={this.props.match.params.id} project={this.props.location.project}/>
                <CreateStoryPopup id={this.props.match.params.id}/>
                <br/>
                <Story stories={this.state.stories} ReloadData={this.ReloadData}/>
                {/* <StoryCard card={this.state.exampleStory} ReloadData={this.ReloadData}/> */}
            </div>
        )
    }
}