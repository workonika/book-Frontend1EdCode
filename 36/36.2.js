import React from 'react';

const WriterList = ({ list }) => (
    <ul>
        {
            list.map(({ id, name, lastName }) => <li key={id}>{name} {lastName}</li>)
        }
    </ul>
);

export const WritersPresentation = ({ genre }) => {
    /** другой код  */
    const writers = [
        { id: 'zX34c', name: 'Айзик', lastName: 'Азимов'}, 
        { id: 'V5gHq', name: 'Роберт', lastName: 'Шекли'}, 
        { id: 'wEr45', name: 'Герберт', lastName: 'Уэлс'}];

    return <WriterList list={writers} />;
}