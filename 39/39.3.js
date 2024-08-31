import React, { createContext, useContext, Fragment, useState } from 'react';

export const GreetingUpdateContext = createContext(null);

export const ParentContextComponent = () => {
    const [greetings, setGreetings] = useState([
        "Привет от современной фронтенд-разработки",
        "Hello World!",
        "Наше вам с кисточкой!",
    ]);
    const currentComponentId = "parent";
    const [id, setId] = useState(currentComponentId);

    const [nextGreeting] = greetings;

    const handleUpdateState = (e) => {
        const [firstGreeting, ...restGreetings] = greetings;

        setId(e.target.id);
        setGreetings([...restGreetings, firstGreeting]);
    }

    return (
        <GreetingUpdateContext.Provider value={handleUpdateState}>
            <div>{nextGreeting}</div>
            <div>Состояние обновил: {id}</div>
            <button id={currentComponentId} onClick={handleUpdateState}>{currentComponentId}</button>
            <ChildFirstLevel />
        </GreetingUpdateContext.Provider>
    );
}

export const ChildFirstLevel = () => (
    <Fragment>
        <ChildSecondLevel id="first" />
        <ChildSecondLevel id="second" />
    </Fragment>
);

export const ChildSecondLevel = ({ id }) => {
    
    const handleUpdateState = useContext(GreetingUpdateContext);
    
    return (<button id={id} onClick={handleUpdateState}>{id}</button>);
}
