import React, { useState } from 'react';

export const Score = () => {

    const [score, setScore] = useState(0);
        
    return (
        <div>
            <button title='-' onClick={() => setScore(prevState => prevState === 0 ? 0 : prevState - 1)}>-</button>
            <span>{ score }</span>
            <button title='+' onClick={() => setScore(prevState => prevState + 1)}>+</button>
        </div>
    );
}