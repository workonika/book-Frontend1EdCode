import React, { createContext, useState } from 'react';
import { ChildFirstLevel } from './child_first_level_39.1';

export const ExampleContext = createContext(null);

export const ParentContextComponent = () => {
    const [greetings, setGreetings] = useState([
        "Привет от современной фронтенд-разработки",
        "Hello World!",
        "Наше вам с кисточкой!",
    ]);

    const handleClick = () => {
        const [firstGreeting, ...restGreetings] = greetings;
        setGreetings([...restGreetings, firstGreeting]);
    };

    const [nextGreeting] = greetings;

    return (
        <ExampleContext.Provider value={nextGreeting}>
            <div><button onClick={handleClick}>Следующее приветствие</button></div>
            <ChildFirstLevel />
        </ExampleContext.Provider>
    );
}