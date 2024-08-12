import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WorkplaceListPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import MainHeader from "../../../app-layout/MainHeader";
import { removeUserToken } from "../../../../utils/auth";
import useAuth from '../../../../hooks/useAuth';
import { workplaceActions } from '../../../../store/workplace-slice';
import { useDispatch, useSelector } from 'react-redux';

const WorkplaceListPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useAuth();
    const [workplaces, setWorkplaces] = useState([]);

    useEffect(() => {
        const fetchWorkplaces = async () => {
            if (userId) { // userId가 존재할 때만 요청
                try {
                    const response = await axios.get(`http://localhost:8877/workplace/list/${userId}`);
                    setWorkplaces(response.data.workplaces);
                } catch (error) {
                    console.error('Error fetching workplace data:', error);
                }
            }
        };

        fetchWorkplaces();
    }, [userId]); // userId가 변경될 때마다 실행

    const deleteHandler = async (id, name) => {
        const confirmed = window.confirm(`[${name}] 업장을 삭제하시겠습니까 ❓`);
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8877/workplace/delete/${id}`);
                setWorkplaces((prevWorkplaces) => prevWorkplaces.filter(workplace => workplace.id !== id));
            } catch (error) {
                console.error('Error deleting workplace:', error);
            }
        }
    };

    // const setIdHandler = (workplaceId, e) => {
    //     console.log("bind함수 확인용: ", workplaceId);
    //     dispatch(workplaceActions.setWorkplaceId({workplaceId}));
    // }

    // 새로고침 이슈로 로컬스토리지 가져오는 걸로 정정
    const setIdHandler = (workplaceId, e) => {
        console.log("로컬스토리지 사업장 아이디: ", workplaceId);
        localStorage.setItem('workplaceId', workplaceId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to="regist">
                    <button className={styles.registerButton}>사업장 등록</button>
                </Link>
            </div>

            <div>
                <h1>사업장 목록</h1>
                {workplaces.length === 0 ? (
                    <p>등록된 사업장이 존재하지 않습니다.</p>
                ) : (
                    <ul className={styles.list}>
                        {workplaces.map(workplace => (
                            <li key={workplace.id} className={styles.listItem}>
                                <Link to={`/detail`} className={styles.link} onClick={(e) => {setIdHandler(workplace.id, e)}}>
                                    <h2>{workplace.workplaceName}</h2>
                                    <p>주소: {`${workplace.workplaceAddressStreet} ${workplace.workplaceAddressDetail}`}</p>
                                    <p>사업장 규모: {workplace.workplaceSize ? '5인 이상' : '5인 미만'}</p>
                                    <div className={styles.wrap}>
                                    <p className={styles.date}>등록일: {new Date(workplace.workplaceCreatedAt).toLocaleDateString()}</p>
                                {/* </Link> */}
                                <div className={styles.buttonGroup}>
                                    <Link to={`modify`}>
                                        <button className={styles.modifyButton}>사업장 수정</button>
                                    </Link>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            deleteHandler(workplace.id, workplace.workplaceName)
                                        }}
                                    >
                                        사업장 삭제
                                    </button>
                                </div>
                                </div>
                                </Link>
                                
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WorkplaceListPage;
