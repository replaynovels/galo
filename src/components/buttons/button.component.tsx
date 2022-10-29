import React from "react";
import styles from "../../styles/components/buttons.module.sass";

interface IProps {
    id: string;
    children?: any;
    className?: string;
    onClick?: any;
}

const ButtonComponent = (props: IProps) => {
    const {id, children, onClick} = props;
    return(
        <button id={id} onClick={onClick} className={`${styles.baseBtn} ${props.className}`}>
            {children}
        </button>
    )
}

export default ButtonComponent;