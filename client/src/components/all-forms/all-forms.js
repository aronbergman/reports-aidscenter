import React from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import styles from './slyles.module.scss'

const AllForms = () => {
    return (
        <div className={styles["all-forms"]}>

            <h2>Формы и опросы</h2>

            <NavLink to="/testing" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    🔬 Опрос тестируемых «СПИД.ЦЕНТР»
                </div>
            </NavLink>

            Находятся в разработке

            <NavLink disabled to="/groups" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    👥 Группы поддержки
                </div>
            </NavLink>

            <NavLink disabled to="/hot-line" style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                    📞 Горячая линия «СПИД.ЦЕНТР»
                </div>
            </NavLink>

        </div>
    );
};

export default AllForms;
