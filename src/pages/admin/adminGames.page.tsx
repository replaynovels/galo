import React, {useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/buttons/button.component";
import TextAreaInput from "../../components/FormControls/TextAreaInput.component";
import TextInput from "../../components/FormControls/TextInput.component";
import { ROUTE_CLASS } from "../../contants/commonClasses";
import routes from "../../contants/routes";
import useAuth from "../../hooks/useAuth";
import { IGame } from "../../interfaces/games.interface";
import adminService from "../../services/admin.service";
import styles from "../../styles/pages/adminGames.module.sass";
import NewImage from "../../assets/new_label_image.png";

const AdminGames = () => {
    const [games, setGames] = useState<IGame[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const {authState} = useAuth();
    const methods = useForm();

    const addGame = async () => {
        const values: any = methods.getValues();
        const newGame = await adminService.addNewGame({
            ...values,
            created_by: authState.uid
        });
        const copy = [...games];
        copy.push(newGame);
        setGames(copy)
    }

    const getAllGames = async () => {
        const allGames = await adminService.getAllGames();
        setGames(allGames);
    }

    useEffect(() => {
        getAllGames();
    }, [])

    return(
        <div className={ROUTE_CLASS}>
            <div className="d-flex flex-row">
                <h1>Games</h1>
                <ButtonComponent id="addNewGame" onClick={() => setShowAdd(true)}>Add New Game</ButtonComponent>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {games.map(game => {
                    return(
                        <div key={game.id}>
                                <div className={styles.gameCard + " shadow"}>
                                    <img className={styles.gameThumbnail} src={game.thumbnail || NewImage} alt="Game thumbnail" />
                                    <Link to={routes.AdminGameDetail.path.replace(":game_id", game.id)} state={game}><header>{game.title}</header></Link>
                                    <div className="d-flex flex-row align-items-center">
                                        <span><strong>Last Edit: </strong>{game.updated_date}</span>
                                        <span className="ms-5">{game.number_of_levels} Levels</span>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                    </div>
                                </div>
                        </div>
                    )
                })}
            </div>
            <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(addGame)}>
                        <Modal.Body>
                                <TextInput id="title" required placeholder="Game Title" label="Title" />
                                <TextAreaInput 
                                    id="description"
                                />
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonComponent id="cancelAdd">Cancel</ButtonComponent>
                            <ButtonComponent type="submit" id="addGameBtn">Add Game</ButtonComponent>
                        </Modal.Footer>
                    </form>
                </FormProvider>                 
            </Modal>
        </div>
    )
}

export default AdminGames;