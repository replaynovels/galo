import { useState } from "react";
import ButtonComponent from "../buttons/button.component";
import {CgMenuRightAlt} from 'react-icons/cg';
import styles from "../../styles/components/navigationBar.module.sass";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavigationBar = () => {
    const [show, setShow] = useState(false);

    return(
        <>
            <ButtonComponent id="menuBtn" className={styles.mainMenuBtn} onClick={() => setShow(true)}>
                <CgMenuRightAlt size={60} />
            </ButtonComponent>
            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton>
                    Replay Novels
                </Offcanvas.Header>
            </Offcanvas>
        </>
    );
}

export default NavigationBar;