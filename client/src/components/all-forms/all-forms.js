import React from "react";
import { NavLink } from 'react-router-dom';
import test from './test.jpeg'
import hotLine from './hot-line.jpg'
import groupsHiv from './groups-hiv.jpeg'
import pharmacy from './pharmacy.jpeg'
import tg from './tg.png'
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

            <NavLink to="/hotline" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    <div className={styles.image} style={{backgroundImage: `url(${hotLine})`}}/>
                    <p className={styles.title}>Горячая линия «СПИД.ЦЕНТР»</p>
                </div>
            </NavLink>

            <NavLink to="/groups-hiv" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    <div className={styles.image} style={{backgroundImage: `url(${groupsHiv})`}}/>
                    <p className={styles.title}>Группы поддержки ВИЧ+</p>
                </div>
            </NavLink>

            <NavLink to="/groups-tg" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    <div className={styles.image} style={{backgroundImage: `url(${tg})`}}/>
                    <p className={styles.title}>Группы поддержки Транс-персон</p>
                </div>
            </NavLink>

            <NavLink to="/drugs" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    <div className={styles.image} style={{backgroundImage: `url(${pharmacy})`}}/>
                    <p className={styles.title}>Аптека</p>
                </div>
            </NavLink>

        </div>
    );
};

export default AllForms;
