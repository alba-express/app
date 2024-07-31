import React from "react";
import styles from './SlaveManagePage.module.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SlaveManagePage = () => {
    return (
        <>
            <div className={styles['content-box']}>

                <div className={styles['slaveManagementHeader-box']}>
                  <div className={styles['slaveManagementHeader-title']}>직원관리</div>
                  <div className={styles['slaveManagementHeader-count']}>총 직원 수 : 5명</div>
                  <Link to="/detail/slave-regist" className={styles['link-text']}> 
                    <button className={styles['headerButton']} > 직원등록 </button>
                  </Link>
                </div>

                <div className={styles['slaveManagementTitle-box']}>
                  <div className={styles['slaveManagementTitle-list']}> 근무중 아르바이트생 목록 </div>
                  <div className={styles['slaveManagementTitle-list']}> 퇴사한 아르바이트생 목록 </div>
                  <div className={styles['slaveManagementTitle-searchbox']}>
                    <input className={styles['slaveManagementTitle-search']} value={"이름으로 검색"} />
                    <FontAwesomeIcon icon={faSearch} className={styles['slaveManagementList-question']} />
                  </div>
                </div>

                <div>
                  <div className={styles['slaveManagementList-title']}>
                    <div className={styles['slaveManagementList-titleNumber']}>직원번호</div>
                    <div className={styles['slaveManagementList-titleName']}>이름 & 직책</div>
                    <div className={styles['slaveManagementList-titleTime']}>근무시간</div>
                    <div className={styles['slaveManagementList-titleJoin']}>입사일</div>
                  </div>

                  <div className={styles['slaveManagementList-content']}>

                    <div className={styles['slaveManagementList-box']}>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      <div className={styles['slaveManagementList-OneSlave']}>
                        <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
                        <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
                        <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
                        <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
                      </div>

                      

                    </div>


                  </div>
                </div>


            </div>
        </>
    );
};

export default SlaveManagePage;
