import React, { useState } from 'react';

export const Score = () => {

    const [score, setScore] = useState(0);
        
    return (
        <React.Fragment>
            <div>
                <h3>Изменение состояние при помощи score</h3>
                <button title='-' onClick={() => setScore(score === 0 ? 0 : score - 1)}>-</button>
                <span>{ score }</span>
                <button title='+' onClick={() => setScore(score + 1)}>+</button>
            </div>
            <div>
                <h3>Изменение состояние при помощи функции тело которой содержит блок кода</h3>
                <button title='-' onClick={() => {
                    setScore(prevState => {
                        return prevState === 0 ? 0 : prevState - 1;
                    });
                }}>-</button>
                <span>{ score }</span>
                <button title='+' onClick={prevState => {
                        setScore(prevState => {
                            return prevState + 1;
                        });
                    }}>+</button>
            </div>
        </React.Fragment>
    );
}