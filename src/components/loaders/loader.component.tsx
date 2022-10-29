import React from "react";
import styles from "../../styles/components/loader.module.sass"

interface IProps {
    size?: "sm" | "lg";
    loading?: boolean;
    className?: string;
}

const Loader = (props: IProps) => {
    if (!props.loading) return null;
    return (
        <div
            className={`loader ${props.className}`}
        ></div>
    );
};

export default Loader;
