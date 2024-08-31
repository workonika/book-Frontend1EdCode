import React, { useState, useEffect } from 'react';

export const ClickCounter = ({ title }) => {
    const [count, setCount] = useState(0);

    const handleClick = () => setCount(count => count + 1);

    useEffect(() => {
        document.title = `Вы нажали на кнопку ${count} раз`;
    }, []);

    return (
        <section>
            <h3>Добрый день {title}!</h3>
            <p>
                Вы нажали на кнопку {count} раз.
            </p>
            <button onClick={handleClick}>Нажать</button>
        </section>
    );
}