import React from 'react';

export const ExampleComponent = ({ title, count, onClick }) => {
    
    return (
        <section>
            <h3>Добрый день {title}!</h3>
            <p>
                Вы нажали на кнопку {count} раз.
            </p>
            <button onClick={onClick}>Нажать</button>
        </section>
    );
}