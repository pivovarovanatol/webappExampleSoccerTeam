import React from 'react'

const Players = ({players}) => {
    return (
        {players : map((player) => {
            <h1> {player} </h1>
        })}
    )
};



export default Players