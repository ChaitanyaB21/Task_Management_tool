import React, { useState } from "react";
import Input from "./Input";
import Content from "./Content";

const SideNav = (props) => {
    const [initItemsArr, setInitItemsArr] = useState([]);
    const [showSideNav, setShowSideNav] = useState(false);
    const [showBackDrop , setShowBackDrop] = useState(false);

    const onShowNavBtnClick = () => {
        setShowSideNav(true);
        setShowBackDrop(true);
    }

    const handleAddBtnClick = () => {
        setShowSideNav(false);
        setShowBackDrop(false);
    }

    const handleBackdropClick = () => {
        setShowSideNav(false);
        setShowBackDrop(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let ItemIdValue = event.target.ItemId.value;
        let OwnerNameValue = event.target.OwnerName.value;
        let ToNameValue = event.target.ToName.value;
        let DiscripValue = event.target.Discrip.value;

        let formData = {
            ItemId: ItemIdValue,
            OwnerName: OwnerNameValue,
            ToName: ToNameValue,
            Descrip: DiscripValue,
        };

        if (
            ItemIdValue.trim().length > 0 &&
            OwnerNameValue.trim().length > 0 &&
            ToNameValue.trim().length > 0 &&
            DiscripValue.trim().length > 0
        ) {
            // event.target.reset();
            setInitItemsArr((prev) => [...prev, formData]);

            const response = await fetch(
                "http://localhost:4000/form",
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                console.log();
            }

            // Reset the form

        }
    };

    return (
        <React.Fragment>
            
            <div className={`sidenav ${showSideNav ? "show" : ""}`}>
                <div className="logo">
                    WedsIn 
                </div>
                {/* <p>Add a new item to inventory</p> */}
                <form onSubmit={handleFormSubmit} action="/" method="post">
                    <Input />

                    <div className="spacer"></div>
                    <button type="submit" onClick={handleAddBtnClick} name="submit" className="mbtn">
                        <i className="bi bi-list-columns-reverse"></i> Add
                    </button>
                </form>
            </div>
            {/* <div className={`${showSideNav ? "sideNavModal" : "" }`} ></div> */}
            <div onClick={handleBackdropClick} className={` backdrop ${showBackDrop ? "show" : ""}`}></div>
            <Content onShowNav={onShowNavBtnClick} onDelBtnClick={props.onDelBtnClick} itemsArr={initItemsArr} />

        </React.Fragment>
    );
};

export default SideNav;
