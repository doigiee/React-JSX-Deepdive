import React from "react";
import SectionHeading from "./SectionHeading";


const Section = (props) => {
    return (
        <section id={props.name}>
            <SectionHeading text={props.heading} />
            {props.children}
        </section>
    )
}


export default Section