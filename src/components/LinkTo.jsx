import React from "react";


const LinkTo = (props) => {
    const external = props.external
    return (
        <a href={props.href} className={external ? "external" : "internal"}>{props.text}</a>
    )
}


export default LinkTo;