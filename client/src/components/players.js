import React from 'react'

const Players = ({players}) => {
    return (
        <div>
            <center><h1>PLayers List </h1></center>
                {players.map((players) => (
                    <div class = "card">
                        <div class="card-body">
                            <h5 class="card-title"> {players.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"> {players.position}</h6>
                        </div>
                    </div>
                ))}
        </div>
    )
};

export default Players