// Import local dependencies
import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

// ProjectCard Class
export class ProjectCard extends Component{
    // Constructor to allow use of methods
    constructor(){
        super()
        this.DeleteProject = this.DeleteProject.bind(this)
    }

    DeleteProject(e){
        e.preventDefault()
        console.log("Delete "+this.props.card._id)

        axios.delete("http://localhost:4000/projects/" + this.props.card._id)
            // Listen for completion
            .then(()=>{
                // Reload page once server has sent request and recieved confirmation
                this.props.ReloadPage()
            })
            // Listen for Error
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    }

    render(){
        return(
            <div className='d-flex justify-content-center'>
                {/* Project Card */}
                <Card style={{ width: '20rem'}} bg='dark' text='light'> 
                    <Card.Body>
                        {/* Project Name, Edit Link and Delete Button inline */}
                        <Card.Header>
                            <b>{this.props.card.name}</b>
                        </Card.Header>  
                        {/* React Routing with Edit Button*/}
                        <Link to={"/projects/" + this.props.card._id}>
                            <Button variant='outline-success'>
                                View
                            </Button>
                        </Link>
                        {/* Alert & Delete Button*/}
                        <Button onClick={this.DeleteProject}
                            variant='outline-danger'>
                            Delete
                        </Button>             
                    </Card.Body>
                </Card>
            </div>
        )
    }
}