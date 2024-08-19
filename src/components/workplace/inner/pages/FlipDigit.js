import React, { useEffect, useRef } from 'react';
import styles from './CommuteRecord.module.scss'; // 스타일 모듈을 가져옵니다

const FlipDigit = ({ value }) => {
    const digitRef = useRef(null);

    useEffect(() => {
        if (digitRef.current) {
            digitRef.current.classList.add(styles.flip);
            const timer = setTimeout(() => {
                digitRef.current.classList.remove(styles.flip);
            }, 600); // 애니메이션 시간과 일치
            return () => clearTimeout(timer);
        }
    }, [value]);

    const digits = value.toString().padStart(2, '0').split('');
    return (
        <div className={styles.flipDigits}>
            {digits.map((digit, index) => (
                <div key={index} className={styles.flipDigit} ref={digitRef}>
                    <div className={styles.flipTop}>{digit}</div>
                    <div className={styles.flipBottom}>{digit}</div>
                </div>
            ))}
        </div>
    );
};

export default FlipDigit;
