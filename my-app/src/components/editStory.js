// Import local dependencies
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// Edit Story Popup Hook
export function EditStoryPopup(props){
    const [open, setOpen] = useState(false)
    const [story, setStory] = useState(props.card.name)
    const [score, setScore] = useState(props.card.score)

    // Close Popup lambda expression
    const closePopup = () => setOpen(false)
    // Update Data lambda expression
    const updateData = () => {
        // Log Process
        console.log("Updating:" + props.card._id)
        // Edit Object
        const storyEdit = {
            name: story,
            score: score
        }
        // Call Update Function from localhost server
        axios.put('http://localhost:4000/stories/' + props.card._id, storyEdit)
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
        <div>
            {/* PlaceHolder Button */}
            <Button variant='outline-success' onClick={() => {
                setOpen(true)
                }}> Edit 
            </Button>
            {/* Popup */}
            <Popup open={open} closeOnDocumentClick onClose={()=>{
                props.ReloadData()
                closePopup()
            }
                }>
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
                            value={score}
                            onChange={(element) => {
                                setScore(element.target.value)
                            }}/>
                    <br/>
                    <div className='d-flex justify-content-center'>
                        {/* Form Submission */}
                        <Button variant="outline-success" type='submit'> Edit </Button>
                        {/* Cancel Button */}
                        <Button variant="outline-danger" onClick={closePopup}> Cancel </Button>
                    </div>
                </form>
            </Popup>
        </div>
    )
}