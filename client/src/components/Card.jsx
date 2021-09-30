import React from 'react'

export default function Card({name, image, nickname, occupation}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{nickname}</h5>
            <h4>{occupation}</h4>
            <img src={image} alt="img not found" width="200px" height="250px"></img>
        </div>
    )
}