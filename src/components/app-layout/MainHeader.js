import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainHeader.module.scss";

const MainHeader = ({ isHome }) => {
    const navigate = useNavigate();

    const navigateToMainHandler = () => {
        navigate('/');
    }

    return (
        <>
            <div className={styles.homeHeader}>
                <div className={styles.homeHeaderLine}>
                    <div className={styles.homeHeaderContent}>
                        <button className={styles.homeButton} onClick={navigateToMainHandler}>
                            <img
                                src={process.env.PUBLIC_URL + '/images/albunny.png'}
                                alt="홈"
                                className={styles.homeImage}
                            />
                        </button>
                        {isHome && <Link to="/login" className={styles.homeLoginLink}>로그인페이지 이동</Link>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainHeader;
