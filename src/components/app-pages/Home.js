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
                      <img className={styles.img} src={`${process.env.PUBLIC_URL}/images/workplace.png`} alt="완성된 사업장 페이지 이미지" />
                      <div className={styles.infotext}>
                        <h1 className={styles.header}>사업장 목록</h1>
                        <h2 className={styles.header2}>여러 사업장을 등록하여 <br></br> 한 번에 관리할 수 있는 편리함</h2>
                        <p className={styles.ptext}>사업장 등록 시 간편 비밀번호 설정을 통해 중요한 업장 정보 보호합니다.</p>
                        <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/background.png`} alt="알바니 로고" />
                      </div>
                    </div>
                </Section>

                <Section>
                    <div className={styles.wrap2}>
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>직원관리</h1>
                            <h2 className={styles.header2}>직원 등록을 통해 <br></br> 근무 일정 및 급여 정보 산출</h2>
                            <p className={styles.ptext}>한 페이지에 전체적인 직원의 정보, 일정, 급여를 모두 제공합니다.</p>
                        </div>
                        <img className={styles.img3} src={`${process.env.PUBLIC_URL}/images/직원관리 페이지.png`} alt="완성된 직원관리 페이지 이미지" />
                    </div>
                </Section>

                <Section>
                    <div className={styles.wrap2}>
                        <img className={styles.img} src={`${process.env.PUBLIC_URL}/images/급여관리 페이지.png`} alt="완성된 급여관리 페이지 이미지" />
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>급여관리</h1>
                            <h2 className={styles.header2}>월별 총 누적 지출액 파악이 빠르며,<br></br> 직원별 누적 근무시간과 총 급여 확인 가능</h2>
                            <p className={styles.ptext}>간편한 추가 근무수당을 통해 급여액에 추가할 수 있으며 누적되어 산출됩니다.</p>
                            <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/background.png`} alt="알바니 로고" />
                        </div>
                    </div>
                </Section>

                <Section>
                    <div className={styles.wrap2}>
                        <div className={styles.infotext}>
                            <h1 className={styles.header}>일정관리</h1>
                            <h2 className={styles.header2}>직원 등록에서 저장된 근무 일정을 <br></br>반영한 일별 근무자와 근무시간을 제공 </h2>
                            <p className={styles.ptext}>일정 추가 기능을 통해 추가 근무 처리를 할 수 있습니다.</p>
                        </div>
                        <img className={styles.img} src={`${process.env.PUBLIC_URL}/images/일정관리 페이지.png`} alt="완성된 일정관리 페이지 이미지" />
                    </div>
                </Section>

                <Section className={styles.fullPageSection}>
                 <div className={styles.lastwrap}>
                  <img className={styles.img2} src={`${process.env.PUBLIC_URL}/images/출퇴근관리 페이지.png`} alt="완성된 출퇴근 페이지 이미지" />
                  <div className={styles.infotext}>
                  <h1 className={styles.header}>출퇴근 관리</h1>
                  <h2 className={styles.header2}>대리 출퇴근을 방지하기 위해<br></br> 휴대폰 번호를 통해 접근하며 <br></br> 근무시간이 아닐 시 접근 불가</h2>
                  <p className={styles.ptext}>각 출퇴근 클릭 시 현재 시간이 뜨며 시간 준수를 못하여 <br></br>지각/조퇴처리 시 차감된 급여가 자동 산정됩니다.</p>
                 </div>
                </div>

    <div className={styles.footer}>
        알바니 <br></br>
        주소 : 중앙정보처리학원(이대) | 이메일 : albunny@gmail.com <br></br> <br></br>
        Copyrightⓒ알바니
    </div>
</Section>
            </SectionsContainer>
        </>
    );
};

export default Home;
