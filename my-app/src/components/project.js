// Import local dependencies
import React, { Component } from 'react'
import { ProjectCard } from './projectCard'

export class Project extends Component {
    // Render Method
    render(){
        // Return All Projects from props state
        return this.props.projects.map((element) => {
            // Map each element to a new Project Card
            return (
                <div>
                    {/* Display Single Card Element */}
                    <ProjectCard card = {element} ReloadPage={this.props.ReloadPage}></ProjectCard>
                    <br/>
                </div>
            )
        })
    }
}