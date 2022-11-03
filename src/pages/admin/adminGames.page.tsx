import React from "react";
import ButtonComponent from "../../components/buttons/button.component";
import { ROUTE_CLASS } from "../../contants/commonClasses";

const AdminGames = () => {
    return(
        <div className={ROUTE_CLASS}>
            <div className="d-flex flex-row">
                <h1>Games</h1>
                <ButtonComponent id="addNewGame">Add New Game</ButtonComponent>
            </div>
        </div>
    )
}

export default AdminGames;