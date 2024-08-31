import React, { useState, useEffect } from 'react';

export const Clock = ({ onStart, onStop, reset }) => {
    /* Реализация обработки данных и эффектов */

    return (
        <div className="clock" onClick={handleClick}>
            { time }
        </div>
    );
}

export const ChessClock = () => {
    /* Реализация обработки данных*/
    
    return (
        <section className="chess-clock">
            <Clock />
            <Clock />
        </section>
    );
}