import React from 'react';
import AnimatedLineBackground from '../components/AnimatedBackgrounds/animatedLineBg.component';
import { ROUTE_CLASS } from '../contants/commonClasses';
import Logo from "../assets/logo_transparent_bg.png";
import styles from "../styles/pages/home.module.sass";

const Home = () => {
    return(
        <div className={ROUTE_CLASS + " " + styles.homePage}>
            <header className={styles.header}>
                <AnimatedLineBackground />
                <img src={Logo} alt="Logo" className={styles.logo} />
            </header>
        </div>
    )
}

export default Home;