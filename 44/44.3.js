import React, { Fragment, useState, useCallback } from 'react';

const fns = [];

export const ComponentWithFn = () => {
    const [count, setCount] = useState(0);
    /** всё тоже до, что и в листинге 43.2 */
    const innerFn = useCallback(() => {}, []);
    
    fns.push(innerFn);
    /** всё тоже после, что и в листинге 43.2 */
    return (<Fragment>
        <div>{count}</div>
        <button onClick={() => setCount(count => count + 1)}>+1</button>
        {
            fns.map((fn, idx) => <div key={idx}>{(fn === innerFn).toString()}</div>)
        }
    </Fragment>);
};