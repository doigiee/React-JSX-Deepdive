import React from "react"


const ListItems = ({items}) => {
    return (
    <>
    {items.map((item, index) => (
        <li key={index}>
            {item}
        </li>
    ))}
    </>
    )
}


export default ListItems