import React, { useCallback, useState } from 'react';

export const ComponentMemoizedFn = () => {
    const [count, setCount] = useState(0);

    const memoizedFn = useCallback(() => { 
        return setCount(count => count + 1);
    });
    /** реализация компонента */
}