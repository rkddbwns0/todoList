import { useEffect, useState } from 'react';

const useStorageUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storageData = localStorage.getItem('user');
        console.log(storageData);

        if (storageData) {
            setUser(JSON.parse(storageData));
        }
    }, []);

    return { user, setUser };
};

export default useStorageUser;
