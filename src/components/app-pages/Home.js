import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../app-layout/MainHeader";
import { getUserId } from "../../utils/auth";
import { SectionsContainer, Section } from 'react-fullpage';
import styles from "./Home.module.scss";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = getUserId();
        if (userId) {
            navigate('/workplace');
        }

        // 새로고침 시 항상 #section1으로 이동
        window.location.hash = '#section1';
    }, [navigate]);

    const options = {
        sectionClassName: 'section',
        anchors: ["section1", "section2", "section3", "section4", "section5"],
        scrollBar: false,
        navigation: true,
        verticalAlign: false,
        sectionPaddingTop: '50px',
        sectionPaddingBottom: '50px',
        arrowNavigation: true,
        activeSection: 0, // 가장 위 섹션 (#section1)을 기본으로 설정
    };

    return (
        <>
            <MainHeader isHome={true} />

            <SectionsContainer {...options}>
                <Section>
                    <div className={styles.wrap2}>
                      <img className={styles.img} src="./image.jpg" alt="완성된 사업장 페이지 이미지" />
                      <div className={styles.infotext}>
                        <h1 className={styles.header}>사업장 목록</h1>
                        <h2 className={styles.header2}>여러 사업장을 등록하여 <br></br> 한 번에 관리할 수 있는 편리함</h2>
                        <p className={styles.ptext}>사업장 등록시 간편비밀번호 설정을 통해 중요한 업장 정보 보호한다.</p>
                        <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/background.png`} alt="알바니 로고" />
                      </div>
                    </div>
                </Section>

                <Section>
                    <div className={styles.wrap2}>
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>직원관리</h1>
                            <h2 className={styles.header2}>직원 등록을 통해 <br></br> 근무일정 및 급여 정보 산출</h2>
                            <p className={styles.ptext}>한페이지에 전체적인 직원의 정보, 일정, 급여를 모두 제공한다.</p>
                        </div>
                        <img className={styles.img} src="./image.jpg" alt="완성된 직원관리 페이지 이미지" />
                    </div>
                </Section>

                <Section>
                    <div className={styles.wrap2}>
                        <img className={styles.img} src="./image.jpg" alt="완성된 급여관리 페이지 이미지" />
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>급여관리</h1>
                            <h2 className={styles.header2}>월별 총누적지출액 파악이 빠르며,<br></br> 직원별 누적근무시간과 총급여 확인 가능</h2>
                            <p className={styles.ptext}>간편한 추가근무수당을 통해 급여액에 추가할 수 있으며 누적되어 산출된다.</p>
                            <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/background.png`} alt="알바니 로고" />
                        </div>
                    </div>
                </Section>

                <Section>
                    <div className={styles.wrap2}>
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>일정관리</h1>
                            <h2 className={styles.header2}>직원 등록에서 저장된 근무일정을 <br></br>반영한 일별 근무자와 근무시간을 제공 </h2>
                            <p className={styles.ptext}>일정추가 기능을 통해 추가근무 처리를 할 수 있다.</p>
                        </div>
                        <img className={styles.img} src="./image.jpg" alt="완성된 일정관리 페이지 이미지" />
                    </div>
                </Section>

                <Section>
                    <div className={styles.lastwrap}>
                        <img className={styles.img} src="./image.jpg" alt="완성된 출퇴근 페이지 이미지" />
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>출퇴근관리</h1>
                            <h2 className={styles.header2}>대리 출퇴근을 방지하기 위해<br></br> 휴대폰번호를 통해 접근하며 <br></br> 근무시간이 아닐시 접근 불가</h2>
                            <p className={styles.ptext}>각 출퇴근 클릭시 현재 시간이 뜨며 시간 준수를 못하여 <br></br>지각/조퇴처리시 차감된 급여가 자동 산정된다.</p>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        알바니 <br></br>
                        주소 : 중앙정보처리학원(이대) | 이메일 : albani@naver.com <br></br> <br></br>
                        Copyrightⓒ알바니
                    </div>
                </Section>
            </SectionsContainer>
        </>
    );
};

export default Home;
