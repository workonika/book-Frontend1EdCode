import React, { Fragment, useState } from 'react';

const fns = [];

export const ComponentWithFn = () => {
    const [count, setCount] = useState(0);
    const innerFn = () => {};

    fns.push(innerFn);

    return (<Fragment>
        <div>{count}</div>
        <button onClick={() => setCount(count => count + 1)}>+1</button>
        {
            fns.map((fn, idx) => <div key={idx}>{(fn === innerFn).toString()}</div>)
        }
    </Fragment>);
};