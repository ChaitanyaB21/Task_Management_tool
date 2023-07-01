import React, { useEffect, useState } from "react";
// import PencilBtn from "./PencilBtn";
import TrashBtn from "./TrashBtn";
import Lottie from "lottie-react";
import animationData from "../assets/99833-edupia-loading.json";
// import TaskView from "./TaskView";
import ExpandTask from "./ExpandTaskBtn";

const Content = (props) => {
    const [itemsArr, setInitItemsArr] = useState([]);
    const [showLoading, setShowLoading] = useState(true); // New state variable to control loading text visibility
    // const [showTaskView , setShowTaskView] = useState(false);

    const DBdata = async () => {
        const response = await fetch("http://localhost:4000/form", {
            method: 'GET',
        });

        const arrdata = await response.json();
        setInitItemsArr(arrdata);
        setShowLoading(false); // Hide loading text when data arrives
    };

    useEffect(() => {
        DBdata();
    }, [itemsArr]); //itemsArr was written here ;


    return (
        <div className="content-area">

            <div className="header">
                <div>
                    <div className="page-title">Task Manager</div>
                    <div className="page-desc">View and manage all the assigned tasks</div>
                </div>
                <button onClick={props.onShowNav} className="inventory-button"><i className="bi bi-plus-circle"></i> Add Item</button>
            </div>

            {/* Loading text */}
            {showLoading && (
                <div className="loading-text">
                    <Lottie animationData={animationData} loop autoplay style={{ width: 200, height: 200 }} />
                </div>
            )}

            {!showLoading && itemsArr.map((item) => (
                <div  className="content-bar" key={item._id}>
                    <div className="itemnum">{item.itemid}</div>
                    <div className="itemtitle"><b>Owner</b>: {item.Ownername}</div>
                    <div className="itemtitle"><b>To</b>: {item.ToName}</div>
                    <div className="itemtitle"><b>Discrip</b>: {item.Descrip.split(" ").slice(0,7).join(" ")} ......</div>
                    
                    <div className="btncontainer">
                        {/* <PencilBtn id={item._id} /> */}
                        <TrashBtn onDelBtnClick={props.onDelBtnClick} id={item._id} />
                        <ExpandTask id={item._id} owner={item.Ownername} to={item.ToName} descrip={item.Descrip} note={item.Note} />
                    </div>
                    {/* {showTaskView && <TaskView onCrossClick={removeShowTask} key={item._id} descrip={item.Descrip} To={item.ToName} owner={item.Ownername}  />} */}
                </div>
                
            ))}
 
        </div>
    );
};

export default Content;
