// Import local dependencies
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// Create Story Function
export function CreateStoryPopup(props){
    // React Hooks
    const [open, setOpen] = useState(false)
    const [story, setStory] = useState('')
    const [score, setScore] = useState(0)
    const [pId, setPId] = useState(props.id)
    const [column, setColumn] = useState('col1')

    // Closes popup
    const closePopup = () => setOpen(false)
    // Exports Data to MongoDB
    const exportData = () => {
        // New Object for export
        const newStory = {
            story: story,
            score: score,
            column: column,
            pId: pId
        }
        // Export Object to Server
        axios.post('http://localhost:4000/stories/add',newStory)
            // Listen for Completion
            .then((result) => {
                // Log action
                console.log(result)
            })
            // Listen for Errors
            .catch((error) => {
                console.log(error)
            })
    }
        
    return(
        // General Div
        <div className='App'>
            {/* PlaceHolder Button */}
            <Button variant='outline-success' onClick={() => {
                setOpen(true)
                }}> Add New Story
            </Button>
            {/* Popup */}
            <Popup open={open} closeOnDocumentClick onClose={closePopup}>
                {/* Form */}
                <form onSubmit={() =>{
                    // Create New Project
                    exportData()
                    // Close Popup
                    closePopup()
                }} >
                    {/* Name Input Form */}
                    <div className='d-flex justify-content-center'>
                        {/* Label */}
                        <h4>Story Text</h4>
                    </div>
                    {/* Name Input */}
                    <input type='text'
                            className='form-control'
                            value={story}
                            onChange={(element) => {
                                setStory(element.target.value)
                            }}/>
                    <br/>
                    {/* Name Input Form */}
                    <div className='d-flex justify-content-center'>
                        {/* Label */}
                        <h4>Score</h4>
                    </div>
                    {/* Name Input */}
                    <input type='text'
                            className='form-control'
                            value={score}
                            onChange={(element) => {
                                setScore(element.target.value)
                            }}/>
                    <br/>
                    <div className='d-flex justify-content-center'>
                        {/* Form Submission */}
                        <Button variant="outline-success" type='submit'> Add</Button>
                        {/* Cancel Button */}
                        <Button variant="outline-danger" onClick={closePopup}> Cancel </Button>
                    </div>
                </form>
            </Popup>
        </div>
    )
}
