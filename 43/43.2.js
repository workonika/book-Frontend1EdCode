import { useRef, useState } from 'react';

export const SilentStopWatch = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    const timeRef = useRef(0);
    const isStopWatchRun = useRef(false);

    const handleStartStop = () => {
        isStopWatchRun.current = !isStopWatchRun.current;
        if (isStopWatchRun.current) {
            timeRef.current = Date.now();
        } else {
            setTimeLeft(Date.now() - timeRef.current);
        }
    }

    return <button onClick={handleStartStop}>{timeLeft}</button>;
};