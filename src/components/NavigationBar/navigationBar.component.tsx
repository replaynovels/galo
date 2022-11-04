import { useEffect, useState } from "react";
import ButtonComponent from "../buttons/button.component";
import {CgMenuRightAlt} from 'react-icons/cg';
import {HiHome} from "react-icons/hi";
import {IoGameController} from "react-icons/io5"
import styles from "../../styles/components/navigationBar.module.sass";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "../../assets/logo_transparent_bg.png";
import { Link } from "react-router-dom";
import routes from "../../contants/routes";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, provider } from "../../firebase/setupFirebase";
import useAuth from "../../hooks/useAuth";
import { CLEAR_AUTH, LOGIN } from "../../contexts/reducers/auth.reducer";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import LottiePlayer from "../Animated/lottiePlayer.component";
import { USER_COLLECTION } from "../../contants/collections.constant";

const NavigationBar = () => {
    const [show, setShow] = useState(false);
    const {updateAuth, clearAuthState, authState} = useAuth();

    const signInWithGoogle = async () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Token: ", token);
            console.log("user: ", user);
            console.log("Full Result: ", result);
            const {displayName, email, photoURL, uid} = user;
            await setDoc(doc(db, USER_COLLECTION, user.uid), {
                displayName, email, photoURL, uid
            }, {merge: true});
            const firebaseUser = await getDoc(doc(db, "users", uid));
            if(!firebaseUser.exists()){
                console.error("No user found in the db.");
                return;
            }
            const userData = await firebaseUser.data();
            updateAuth(LOGIN, {...userData, googleCredential: credential, googleToken: token});
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log("Error: ", error);
            clearAuthState();
        });
    }

    const signOut = () => {
        updateAuth(CLEAR_AUTH);
    }

    useEffect(() => {
        console.log("AuthState: ", authState);
    }, [authState])

    return(
        <>
            <ButtonComponent id="menuBtn" className={styles.mainMenuBtn} onClick={() => setShow(!show)}>
                <CgMenuRightAlt size={60} />
            </ButtonComponent>
            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton={false}>
                    {
                        authState.authenticated
                        ?<img src={authState.photoURL || ""} alt="User Avatar" className={styles.avatar + " " + "shadow-lg border border-light"} />
                        :<img src={Logo} alt="logo" className={styles.logo} />
                    }
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column align-items-center">
                    <div>
                        {
                            authState.authenticated
                            ?<><ButtonComponent onClick={signOut} id="signIn">Sign Out</ButtonComponent><ButtonComponent id="myGames">My Games</ButtonComponent></>
                            :<ButtonComponent onClick={signInWithGoogle} id="signIn">Sign In</ButtonComponent>
                        }
                        {
                            authState?.isAdmin && (
                                <Link to="/admin/games">Admin Dashboard</Link>
                            )
                        }
                    </div>
                    <Link className={styles.navItem} to={routes.Home.path}>
                        {/* <HiHome size={200} /> */}
                        {/* https://lottiefiles.com/web-player?lottie_url=https%3A%2F%2Fassets2.lottiefiles.com%2Fprivate_files%2Flf30_LBiSi2.json   or https://lottiefiles.com/20088-home */}
                        {/* @ts-ignore */}
                        <LottiePlayer src="https://assets2.lottiefiles.com/private_files/lf30_LBiSi2.json"  background="transparent"  speed="1"  style={{height: 300, width: 300}}  loop autoplay mode="bounce" />
                    </Link>
                    <Link className={styles.navItem} to={routes.Home.path}>
                        <LottiePlayer src="https://assets3.lottiefiles.com/packages/lf20_q92kOhRW8O.json"  background="transparent"  speed="1"  style={{height: 300, width: 300}}  loop  autoplay/>
                    </Link>
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