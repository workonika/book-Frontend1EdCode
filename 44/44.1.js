import React, { Fragment, useMemo } from 'react';

const productList = [{/* Загрузите из generateUserList.js */}];

const ListItem = ({ id, userName, email }) => <div>{id}, {email}, {userName}</div>;

const createSortFunction = (direction) => {
    
    if (direction) {
        return (a, b) => {
            if(a.name > b.name)
                return -1;
            return 1;
        }
    }

    return (a, b) => {
        if(a.name > b.name)
            return 1;
        return -1;
    }
}

export const ComponentWithUseMemo = ({ productList }) => {
    const [isAscDirection, setIsAscDirection] = useState(false);
    const [state, setState] = useState(false);

    const memoizedProductList = useMemo(() => 
        productList.sort(createSortFunction(isAscDirection)), 
    [isAscDirection, productList]);

    const handleClick = (isAsc) => setIsAscDirection(isAsc);

    return (<Fragment>
        <button onClick={() => setState(!state)}>state {state.toString()}</button>
        <button onClick={() => handleClick(false)}>По возрастанию</button>
        <button onClick={() => handleClick(true)}>По убыванию</button>
        {
            memoizedProductList.map(item => <ListItem key={item.id} email={item.email} id={item.id} userName={item.name} />)
        }
    </Fragment>);
}
