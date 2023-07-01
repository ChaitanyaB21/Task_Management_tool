import React, { useState } from "react";
import Card from "./Card";

const TaskView = (props) => {

    // const [notes , setNotes] = useState('');

    const handleNoteChange = (event) => {
        // setNotes(event.target.value);
    }

    const handleTaskViewFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <Card onCrossBtnClick={props.onCrossClick} >
                <h1>Task View</h1>
                <p>View your task</p>
                <p style={{ textAlign: 'left' }} > <b>Owner </b> : {props.owner}</p>
                <p style={{ textAlign: 'left' }} ><b>Assigned to : </b> {props.To} </p>
                <p style={{ textAlign: 'left' }} ><b>Task Description</b> : <br></br> {props.descrip}</p>
                <p style={{ textAlign: 'left' }} ><b>Add a note :</b></p>
                <form onSubmit={handleTaskViewFormSubmit} >
                    <input type="text" id={props.key}  onChange={handleNoteChange} style={{ textAlign: 'left' }} />
                    <button type="submit">Submit</button>
                </form>
            </Card>

        </React.Fragment>
    )
}

export default TaskView;