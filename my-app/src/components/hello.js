// Import local Dependencies
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

// Welcome Page
export class Welcome extends Component{
    // Render
    render(){
        return(
            <div className='App'>
                <h1>Welcome to Projects & Stories</h1>
                <p>
                    This is my attempt on creating an application similar to Jira Boards,<br/>
                    The User can create new Projects and new Stories,<br/>
                    The User can also edit them By Clicking On The Project Title in the View Screen
                    These creations can also be deleted.<br/>
                    <br/>
                    My Hope was to build drag and drop boards to schedule timelines and display their data,<br/>
                    however this turned to become a nightmare hellscape that I spent 2-3 weeks on. Help me<br/>
                    I do hope that you enjoy my attempt
                </p>
                
                <Link to={'/projects'}>
                    <Button variant='outline-success'>Go to Project's HomePage</Button>
                </Link>
                <br/>
                <br/>
            </div>
        )
    }
}