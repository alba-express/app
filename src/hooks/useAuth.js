import { useState, useEffect } from 'react';
import { getUserId } from '../utils/auth';

const useAuth = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = getUserId();
        setUserId(id);
    }, []);

    return userId;
};

export default useAuth;
