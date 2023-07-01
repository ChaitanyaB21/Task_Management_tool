import React from "react";

const Input = () => {
    return (
        <div className="searchbar">
            <input placeholder="Task Id" name="ItemId" className="search" type="text" />
            <input placeholder="Owner Name" name="OwnerName" className="search" type="text" />
            <input placeholder="Assign to" name="ToName" className="search" type="text" />
            <input placeholder="Discription" name="Discrip" className="search" type="text" />
            {/* <input placeholder="Price per unit" name="ItemPrice" type="number" className="search" /> */}
            {/* <input placeholder="Stock" name="ItemStock" className="search" type="number" /> */}
            
            
        </div>
    )
}

export default Input;