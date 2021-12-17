// Import local dependencies
import React, { Component } from 'react'
import { StoryCard } from './storyCards'

export class Story extends Component{
    // Render Method
    render(){
        // Return all Story elements from stories
        return this.props.stories.map((element) => {
            // Map each element to a new StoryCard
            return(
                <StoryCard card={element} ReloadData={this.props.ReloadData}></StoryCard>
            )
        })
    }
}