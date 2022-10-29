import { useState } from "react";
import ButtonComponent from "../buttons/button.component";
import {CgMenuRightAlt} from 'react-icons/cg';
import {HiHome} from "react-icons/hi";
import {IoGameController} from "react-icons/io5"
import styles from "../../styles/components/navigationBar.module.sass";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "../../assets/logo_transparent_bg.png";
import { Link } from "react-router-dom";
import routes from "../../contants/routes";

const NavigationBar = () => {
    const [show, setShow] = useState(false);

    return(
        <>
            <ButtonComponent id="menuBtn" className={styles.mainMenuBtn} onClick={() => setShow(true)}>
                <CgMenuRightAlt size={60} />
            </ButtonComponent>
            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton={false}>
                    <img src={Logo} alt="logo" className={styles.logo} />
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column align-items-center">
                    <Link className={styles.menuItem} to={routes.Home.path}>
                        <HiHome size={50} />
                        <span>Home</span>
                    </Link>
                    <Link className={styles.menuItem} to={routes.Home.path}>
                        <IoGameController size={50} />
                        <span>Games</span>
                    </Link>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default NavigationBar;