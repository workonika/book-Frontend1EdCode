import { useEffect, useState } from 'react';

const getLocalTime = () => new Date().toLocaleTimeString();

export const Clock = () => {
    const [time, setTime] = useState(getLocalTime());

    useEffect(() => {
        const intervalId = setInterval(() => setTime(getLocalTime()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <span>
            {time}
        </span>
    );
}

