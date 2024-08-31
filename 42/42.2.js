import React, { Fragment, useReducer } from 'react';

const reducer = (state, action) => {
    const { type } = action;

    if (type === 'reset') {
        return { count: 0 }
    }

    return { count: state.count + (type === 'increment' ? 1 : - 1) }
};

/** реализация до, как в листинге 42.1 */
const initializer = (initialValue) => ({ count: initialValue });

export const ClickCounter = () => {
    const [state, dispatch] = useReducer(reducer, 3, initializer);
/** реализация после, как в листинге 42.1 */
    return (<Fragment>
        <div>{state.count}</div>
        <button onClick={() => dispatch({ type: 'increment' })}>Плюс 1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Минус 1</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Сбросить к нулю</button>
    </Fragment>);
};