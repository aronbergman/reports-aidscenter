import React from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import test from './test.jpeg'
import styles from './slyles.module.scss'

const AllForms = () => {
    console.log('test', )
    return (
        <div className={styles["all-forms"]}>
            <br/>
            <h4>Формы и опросы</h4>

            <NavLink to="/testing" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    <div className={styles.image} style={{backgroundImage: `url(${test})`}}/>
                    <p className={styles.title}>Опрос тестируемых «СПИД.ЦЕНТР»</p>
                </div>
            </NavLink>

            <br/>
            Находятся в разработке

            <NavLink disabled to="/groups" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    Группы поддержки
                </div>
            </NavLink>

            <NavLink disabled to="/hot-line" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    Горячая линия «СПИД.ЦЕНТР»
                </div>
            </NavLink>

        </div>
    );
};

export default AllForms;
