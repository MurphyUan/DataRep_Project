// Import local dependencies
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// Edit Story Popup Hook
export function EditStoryPopup(){
    const [open, setOpen] = useState(false)
    const [story, setStory] = useState('')
    const [score, setScore] = useState(0)

    // Component Did Mount for React Hooks
    useEffect(() => {
        console.log(this.props.card.id)

        axios.get('http://localhost:4000/story/' + this.props.card.id)
            // Listen for Completion
            .then((result) => {
                // Log Result
                console.log(result)
                // Update State Values
                setStory(result.data.name)
                setScore(result.data.score)
            })
            // Listen for Error
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    })
    // Close Popup lambda expression
    const closePopup = () => setOpen(false)
    // Update Data lambda expression
    const updateData = () => {
        // Log Process
        console.log("Updating:" + this.props.card.id)
        // Edit Object
        const storyEdit = {
            story: story,
            score: score
        }
        // Call Update Function from localhost server
        axios.put('http://localhost:4000/story/' + this.props.card.id, storyEdit)
            // Listen for Completion
            .then((result) => {
                // Log Result
                console.log(result)
            })
            // Listen for Error
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    }

    return(
        // General Div
        <div className='App'>
            {/* PlaceHolder Button */}
            <Button variant='outline-success' onClick={() => {
                setOpen(true)
                }}> Edit 
            </Button>
            {/* Popup */}
            <Popup open={open} closeOnDocumentClick onClose={closePopup}>
                {/* Form */}
                <form onSubmit={() =>{
                    // Create New Project
                    updateData()
                    // Close Popup
                    closePopup()
                }} >
                    {/* Story Input Form */}
                    <div className='d-flex justify-content-center'>
                        {/* Label */}
                        <h4>Story</h4>
                    </div>
                    {/* Story Input */}
                    <input type='text'
                            className='form-control'
                            value={story}
                            onChange={(element) => {
                                setStory(element.target.value)
                            }}/>
                    {/* Score Input Form */}
                    <div className='d-flex justify-content-center'>
                        {/* Label */}
                        <h4>Score</h4>
                    </div>
                    {/* Score Input */}
                    <input type='text'
                            className='form-control'
                            value={story}
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