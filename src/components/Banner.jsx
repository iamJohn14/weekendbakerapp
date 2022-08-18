import React from "react";




export default function Banner(props) {
    return (
        <div className="p-5">
            <h1 className='mt-3 bannertitle pt-5'>{props.title}</h1>
        </div>
    )
}