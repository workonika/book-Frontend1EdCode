import React, { Fragment, useState, Profiler } from 'react';

const list = [{id: 1, value: 'Первый'}, {id: 2, value: 'Второй'}, 
{id: 3, value: 'Третий'}, {id: 4, value: 'Четвёртый'}, {id: 5, value: 'Пятый'},
{id: 6, value: 'Шестой'}, {id: 7, value: 'Седьмой'}, {id: 8, value: 'Восьмой'}];

const ListItem = ({ value }) => <div>{value}</div>;

export const ListAndStateComponent = () => {
    const [property, setProperty] = useState(false);

    const handleClick = () => setProperty(prop => !prop);

    return (<Fragment>
        <div>Сейчас состояние: {`${property}`}</div>
        <button onClick={handleClick}>Сменить состояние</button>
        {
            list.map(({id, value}) => <ListItem key={id} value={value} />)
        }
    </Fragment>);
}