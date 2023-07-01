import React, { useState } from "react";
import classes from "./DragDrop.module.css";
// import {storage} from "./firebase";

const DragDrop = (props) => {
    const [files, setFiles] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);

    const handleFilesInputChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles);
        props.onFileData(selectedFiles) ;  // Sending the files to ExpandTaskBtn File (Moving the state up)
        const previews = Array.from(selectedFiles).map((file) =>
            URL.createObjectURL(file)
        );
        setFilePreviews(previews);
    };

    // const UploadBtnClickHandler = () => {
    //     if(files == null)
    //     {
    //         return;
    //     }
    // }

    return (
        <React.Fragment>
            <div className={classes['master-div']} >
                

                <div className="">
                    <input type="file" multiple onChange={handleFilesInputChange} />
                </div>

                <div>
                    {filePreviews.map((previewUrl, idx) => (
                        <div key={idx}>
                            {files[idx].type.startsWith("image/") ? (
                                <img src={previewUrl} className={classes["preview-image"]} alt="Preview" />
                            ) : (
                                <video className={classes["preview-image"]} src={previewUrl} controls />
                            )}
                        </div>
                    ))}
                </div>
                {/* <button onClick={UploadBtnClickHandler} >Upload</button> */}
            </div>
        </React.Fragment>
    );
};

export default DragDrop;
