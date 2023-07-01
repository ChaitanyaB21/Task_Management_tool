import React, { useState } from "react";
import Card from "./Card";
import DragDrop from "./DragDrop";
import DisplayFiles from "./DisplayFiles";

const ExpandTask = (props) => {
  const [expandTask, setExpandTask] = useState(false);
  const [notes, setNotes] = useState('');
  const [expandBtnId, setExpandBtnId] = useState('');
  const [fileData, setFileData] = useState(null);
  const [responseFiles , setResponseFiles] = useState([]);

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  }

  const handleClick = (event) => {
    setExpandTask(true);
    setExpandBtnId(event.currentTarget.id);
  }

  const handleOnFileData = (fileData) => {
    setFileData(fileData);
  }

  const handleTaskViewFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('note', notes);

    if (fileData) {
      for (const file of fileData) {
        formData.append('files', file);
      }
    }

    const response = await fetch(`http://localhost:4000/update/${expandBtnId}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json() ;
      if(data.files && data.files.length > 0)
      {
        setResponseFiles(data.files);
      }
    }
  }

  const handleCancelClick = () => {
    setExpandTask(false);
  }

//   console.log("ExTB121 " , responseFiles);

  return (
    <React.Fragment>
      {!expandTask ? (
        <button onClick={handleClick} id={props.id} type="button" className="cbbtn">
          <i className="bi bi-arrows-angle-expand"></i>
        </button>
      ) : (
        <Card onCrossBtnClick={handleCancelClick}>
          <form onSubmit={handleTaskViewFormSubmit}>
            <h1>Task View</h1>
            <p>View your task</p>
            <p style={{ textAlign: 'left' }}><b>Owner </b>: {props.owner}</p>
            <p style={{ textAlign: 'left' }}><b>Assigned to: </b>{props.to}</p>
            <p style={{ textAlign: 'left' }}><b>Task Description:</b> <br />{props.descrip}</p>
            {props.note.trim().length > 0 && <p style={{ textAlign: 'left' }} ><b>Note:</b><br />{props.note}</p>}
            <DisplayFiles id={props.id} fileData = {responseFiles} /> 
            <p style={{ textAlign: 'left' }}><b>Add a note:</b></p>

            <input type="text" id={props.key} name="note" onChange={handleNoteChange} style={{ textAlign: 'left' }} />
            <DragDrop key={props.id} onFileData={handleOnFileData} />
            <button type="submit">Submit</button>
          </form>
        </Card>
      )}
    </React.Fragment>
  );
}

export default ExpandTask;
