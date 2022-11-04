import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import ButtonComponent from "../../components/buttons/button.component";
import TextInput from "../../components/FormControls/TextInput.component";
import { ROUTE_CLASS } from "../../contants/commonClasses";

const AdminGames = () => {
    const [showAdd, setShowAdd] = useState(false);
    const methods = useForm();
    return(
        <div className={ROUTE_CLASS}>
            <div className="d-flex flex-row">
                <h1>Games</h1>
                <ButtonComponent id="addNewGame" onClick={() => setShowAdd(true)}>Add New Game</ButtonComponent>
            </div>
            <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <Modal.Body>
                    <FormProvider {...methods}>
                        <TextInput id="title" required placeholder="Game Title" label="Title" />
                    </FormProvider>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminGames;