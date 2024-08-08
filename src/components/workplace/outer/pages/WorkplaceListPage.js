import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MainHeader from "../../../app-layout/MainHeader";
import { removeUserToken } from "../../../../utils/auth";

const WorkplaceListPage = () => {
//   재한님 코드 추가
  const navigate = useNavigate();

  const handleLogout = () => {
    // JWT 토큰 삭제
    removeUserToken();
    // 로그인 페이지로 리다이렉트
    navigate("/login");
  }
//       끝

    const [workplaces, setWorkplaces] = useState([]);

    useEffect(() => {
      // API에서 데이터를 가져오는 함수
      const fetchWorkplaces = async () => {
        try {
          const response = await axios.get(`http://localhost:8877/workplace/list/1`);
          setWorkplaces(response.data.workplaces);
        } catch (error) {
          console.error('Error fetching workplace data:', error);
        }
      };

      fetchWorkplaces();
    }, []);

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

    return (
        <>
          <Link to="regist">
            <button>사업장 등록</button>
            <br/>
          </Link>

          <div>
            <h1>사업장 목록</h1>
            {workplaces.length === 0 ? (
                <p>등록된 사업장이 존재하지 않습니다.</p>
            ) : (
                <ul>
                  {workplaces.map(workplace => (
                      <li key={workplace.id} style={{marginBottom: '20px'}}>
                        <h2>{workplace.workplaceName}</h2>
                        <p>주소: {`${workplace.workplaceAddressStreet} ${workplace.workplaceAddressDetail}`}</p>
                        <p>사업장 규모: {workplace.workplaceSize ? '5인 이상' : '5인 미만'}</p>
                        <p>등록일: {new Date(workplace.workplaceCreatedAt).toLocaleDateString()}</p>
                        <Link to={`modify/${workplace.id}`}>
                          <button>사업장 수정</button>
                        </Link>

                        <button onClick={() => deleteHandler(workplace.id, workplace.workplaceName)}>사업장 삭제</button>

                      </li>
                  ))}
                </ul>
            )}
          </div>
          <button onClick={handleLogout}>
            로그아웃
          </button>
        </>
    );
  };

export default WorkplaceListPage;
