import React, { useState } from 'react';

export const DefaultBehaviourForm = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => setValue(e.target.value);

    return (
        <form method="GET" action="http://localhost:3000" encType="application/json">
            <input value={value} onChange={handleChange} />
        </form>
    );
};