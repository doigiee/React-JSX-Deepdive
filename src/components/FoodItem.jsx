import React from "react"


const FoodItem = (props) => {
    return (
    <article>
        <h4>{props.name}</h4>
        <img src={props.src} alt={props.alt} height="400" width="400"/>
        <p>Best time to eat: <span>{props.time}</span></p>
        <p>Best place: <span>{props.place}</span></p>
    </article>
    )
}


export default FoodItem
