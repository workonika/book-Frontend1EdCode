import React, { useState, useEffect } from 'react';

export default function App(){
    /* Реализация обработки данных и эффектов */

    return (
        <main>
            <ChessClock />
            {/* другие компоненты и элементы */}
        </main>
    );
}

export const ChessClock = ({ player1, player2 }) => {
    /* Реализация обработки данных*/
    
    return (
        <section className="chess-clock">
            <Clock />
            {/* другие компоненты и элементы */}
        </section>
    );
}

export const Clock = ({ onStart, onStop, reset }) => {
    /* Реализация обработки данных и эффектов */

    return (
        <div className="clock" onClick={handleClick}>
            { time }
        </div>
    );
}