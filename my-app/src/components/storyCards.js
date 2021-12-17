// Import local dependencies
import React, { Component } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { EditStoryPopup } from './editStory'

export class StoryCard extends Component{
    constructor(){
        super()
        // Bind Methods
        this.DeleteStory = this.DeleteStory.bind(this)
    }
    DeleteStory(){
        // Log Action
        console.log("Delete: " + this.props.card._id)
        // Attempt Delete Action
        axios.delete("http://localhost:4000/stories/" + this.props.card._id)
            // Listen for completion
            .then((result) => {
                // Log resulting data
                console.log(result)
                // Reload Page
                this.props.ReloadData()
            })
            // Listen for Errors
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    }
    // Render Method
    render(){
        return(
            // Styling Div
            <div className='d-flex justify-content-center'>
                {/* Story Displayed As Alert */}
                <Alert variant="dark" onClose={this.DeleteStory} dismissible>
                    <div className='d-flex justify-content-start'>
                        <h6>Name: {this.props.card.name}</h6>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <h6>Score: {this.props.card.score}</h6>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <EditStoryPopup card={this.props.card} ReloadData={this.props.ReloadData}/>
                    </div>
                    
                </Alert>
            </div>
        )
    }
    
}