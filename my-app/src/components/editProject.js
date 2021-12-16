// Import Local Dependencies
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// Edit Existing Project
export function EditProjectPopup(){
    // Variable declaration
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        // Log Task
        console.log("Editing: " + this.props.project.id)
        // Get Project Details
        axios.get('http://localhost:4000/projects/' + this.props.project.id)
            // Listen for completion
            .then((result) => {
                // Log Result
                console.log(result.data)
                setName(result.data.name)
            })
            // Listen for error
            .catch((error) => {
                // Log Error
                console.log(error)
            })
    })
    // Close Popup expression
    const closePopup = () => setOpen(false)
    // Update Project expression
    const updateData = () => {
        // Log Task
        console.log("Finished Editing: " + this.props.project.id)
        // Edit Object
        const projectEdit = {
            name: name
        }
        // Send Project details to MongoDB server to be updated
        axios.put('http://localhost:4000/projects/' + this.props.project.id, projectEdit)
            // Listen for completion
            .then((result) => {
                // Log Result
                console.log(result)
            })
            // Listen for error
            .then((error) => {
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
                    {/* Name Input Form */}
                    <div className='d-flex justify-content-center'>
                        {/* Label */}
                        <h4>Project Title:</h4>
                    </div>
                    {/* Name Input */}
                    <input type='text'
                            className='form-control'
                            value={name}
                            onChange={(element) => {
                                setName(element.target.value)
                            }}/>
                    {/* Score Input Form */}
                    <div className='d-flex justify-content-center'>
                        {/* Label */}
                        <h4>Score</h4>
                    </div>
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