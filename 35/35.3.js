import React, { useEffect, useState } from 'react';

export const Person = ({ id }) => {
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const url = `https://somedomain.com/api/person/${id}`;

        fetch(url, { signal: controller.signal }).then(data = data.json()).then(person => setPerson(person));

        return () => { controller.abort() };
    });

    if (!person) {
        return <div>Загрузка...</div>
    }

    const { name, address } = person;

    return (
        <div>
            <span>{name}</span>, <span>{address}</span>
        </div>
    )
}