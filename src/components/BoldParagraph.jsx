import React from "react";


const BoldParagraph = (props) => {
    return (
    <p>
        <b>{props.firstWord}</b> {props.theRest}
    </p>
    )
}


export default BoldParagraph