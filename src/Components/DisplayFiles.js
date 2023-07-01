import React, { useEffect, useState } from "react";

const DisplayFiles = (props) => {
    const [files, setFiles] = useState([]);

    const fileData = async () => {
        const response = await fetch(`http://localhost:4000/update/${props.id}`, {
            method: 'GET',
        });

        const allFilesData = await response.json();
        setFiles(allFilesData);
    };

    useEffect(() => {
        fileData();
    }, []);

    return (
        <React.Fragment>
            <p style={{ textAlign: "left" }}>
                <b>Uploaded Files:</b>
            </p>
            {files.length > 0 && (
                <div>
                    {files[0].Files.map((file, index) => (
                        <div>
                            <img
                                key={index}
                                // src={`../../../Inventory_backEnd/uploads/${file.path.split("").slice(8)}`}
                                src="1688050031169-IntroThumbNail.jpg"
                                alt={`File ${index + 1}`}
                                style={{ width: "200px", height: "auto" }}
                            />
                            <p>{file.path.split("").slice(8)}</p>
                        </div>
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default DisplayFiles;
