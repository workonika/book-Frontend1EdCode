import { Fragment, useRef, useState } from 'react';

export const ComponentWithRef = () => {
    const refTest = useRef(0);
    const [count, setCount] = useState(0);

    const handleIncrementCount = () => setCount(count => count + 1);

    const handleIncrementRefTest = () => refTest.current += 1;

    return (<Fragment>
        <button onClick={handleIncrementCount}>count: {count}</button>
        <button onClick={handleIncrementRefTest}>ref: {refTest.current}</button>
    </Fragment>);
}