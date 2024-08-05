import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WorkplaceListPage = () => {
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    // API에서 데이터를 가져오는 함수
    const fetchWorkplaces = async () => {
      try {
        const response = await axios.get('http://localhost:8877/workplace/list/1');
        setWorkplaces(response.data.workplaces);
      } catch (error) {
        console.error('Error fetching workplace data:', error);
      }
    };

    fetchWorkplaces();
  }, []);

  return (
    <>
    <Link to="regist">
                <button>사업장 등록</button> <br />
    </Link>
    <div>
      <h1>사업장 목록</h1>
      {workplaces.length === 0 ? (
        <p>사업장이 없습니다.</p>
      ) : (
        <ul>
          {workplaces.map(workplace => (
            <li key={workplace.id} style={{ marginBottom: '20px' }}>
              <h2>{workplace.workplaceName}</h2>
              <p>{workplace.workplaceAddressCity} {workplace.workplaceAddressStreet} {workplace.workplaceAddressDetail}</p>
              <p>생성일: {new Date(workplace.workplaceCreatedAt).toLocaleDateString()}</p>
              <p>규모: {workplace.workplaceSize ? '대형' : '소형'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default WorkplaceListPage;
