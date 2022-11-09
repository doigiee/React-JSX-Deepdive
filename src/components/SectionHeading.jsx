import React from "react";
import LinkTo from "./LinkTo";


const SectionHeading = (props) => {
    return (
        <div>
            <h2>{props.text}</h2>
            <LinkTo href="#top" text="Top" />
        </div>
    )
}


export default SectionHeading