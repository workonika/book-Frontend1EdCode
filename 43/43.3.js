import { useRef, useState } from 'react';

export const DOMElementRef = () => {
    const domRef = useRef(null);
    const [count, setCount] = useState(0);

    const handleClick = () => {
        console.log(domRef.current);
        setCount(count => count + 1);
    };

    return <button onClick={handleClick}>Нажать: {count}</button>;
};