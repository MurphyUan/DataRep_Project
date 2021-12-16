// Import local dependencies
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// New Project Popup
export function CreateProjectPopup(){
        // React Hooks 
        const [open, setOpen] = useState(false)
        const [name, setName] = useState('')
        // Inner Function calls
        const closePopup = () => setOpen(false)
        const exportData = () => {
            // Project Object
            const newProject = {
                name: name
            }
            // Post NewProject Object to MongoDB server
            axios.post('http://localhost:4000/projects/add', newProject)
                // Listen for completed data 
                .then((result) => {
                    // Log resultant data
                    console.log(result.data)
                })
                // Listen for error
                .catch((error) => {
                    // Log Error
                    console.log(error)
                })
        }
        // Return Popup Handler
        return(
            // General Div
            <div className='App'>
                {/* PlaceHolder Button */}
                <Button variant='outline-success' onClick={() => {
                    setOpen(true)
                    }}> Add 
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
                            <h4>Project Name</h4>
                        </div>
                        {/* Name Input */}
                        <input type='text'
                                className='form-control'
                                value={name}
                                onChange={(element) => {
                                    setName(element.target.value)
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