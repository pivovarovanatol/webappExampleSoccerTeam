import React from 'react'

const Players = ({players}) => {
    return (
        <div>
        {players.map((player) => {
            <div>
                <h1> {player.name} </h1>
            </div>
        })}
        </div>
    )
};



export default Players