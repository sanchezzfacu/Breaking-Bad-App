import React from 'react'

export default function Card({name, image, nickname, occupation}) {
    return (
        <div>
            <img className="img_card" src={image} alt="img not found" width="220px" height="250px"></img>
            <h3>{name}</h3>
            <h4>Nickname: {nickname}</h4>
            <h4>{occupation + " "}</h4>
        </div>
    )
}