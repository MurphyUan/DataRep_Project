// Import local dependencies
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { EditStoryPopup } from './editStory'

export function StoryCard(){
    const deleteCard = () => {
        console.log("Delete: " + this.props.card._id)

        axios.delete("http://localhost:4000/story/" + this.props.card_id)
            .then((result) => {
                console.log(result)
                this.props.ReloadData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return(
        <div className='d-flex justify-content-center'>
            <Card style={{ width: '20rem'}} bg='dark' text='light'> 
                    <Card.Body>
                        {/* Project Name, Edit Link and Delete Button inline */}
                        <Card.Header>
                            <b>{this.props.card.name}</b>
                        </Card.Header>  
                        {/* React Routing with Edit Button*/}
                        <EditStoryPopup card={this.props.card}/>
                        {/* Alert & Delete Button*/}
                        <Button onClick={deleteCard()}
                            variant='outline-danger'>
                            Delete
                        </Button>             
                    </Card.Body>
                </Card>
        </div>
    )
}