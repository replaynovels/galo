import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ROUTE_CLASS } from "../../contants/commonClasses";
import { IGame } from "../../interfaces/games.interface";

const AdminGameDetail = () => {
    const [gameDetails, setGameDetails] = useState<IGame | null>(null)
    const location = useLocation();

    useEffect(() => {
        console.log("location: ", location);
        if(location.state){
            setGameDetails(location.state);
            return;
        }
        // TODO: Add logic here to get game details if it does not exist on location state
        // eslint-disable-next-line
    }, [])

    return(
        <div className={ROUTE_CLASS + " p-5"}>
            {
                !gameDetails
                ?<div className="d-flex justify-content-center align-items-center">Loading...</div>
                :
                <div className="d-flex flex-column">
                    <h1>{gameDetails.title}</h1>
                    <p>{gameDetails.description}</p>
                    <div className="d-flex flex-row flex-wrap">
                        {gameDetails.images.map(image => <img src={image} alt="game" key={image} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminGameDetail;