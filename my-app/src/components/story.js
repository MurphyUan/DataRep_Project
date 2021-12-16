// Import local dependencies
import React, { Component } from 'react'
import { StoryCard } from './storyCards'

export class Story extends Component{
    render(){
        return this.props.stories.map((element) => {
            <StoryCard card={element} ReloadData={this.props.ReloadData}/>
        })
    }
}