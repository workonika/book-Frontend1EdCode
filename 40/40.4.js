import React, { useState } from 'react';

export const FormEvents = ({ defaultInputValue = '' }) => {
    const [inputValue, setInputValue] = useState(defaultInputValue);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        console.log('change');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    };
    const handleReset = () => {
        inputValue(defaultInputValue);
        console.log('reset');
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <input type="text" value={inputValue} onChange={handleChange} />
            </p>
            <button type="reset">Сбросить</button>
            <button type="submit">Отправить</button>
        </form>
    );
}