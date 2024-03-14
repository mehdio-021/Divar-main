import React from 'react';
import loader from "../assets/loader/Spinner.svg"
import styles from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={styles.container}>
            <img src={loader} alt=""  />
        </div>
    );
};

export default Loader;