import React, { createContext } from 'react';
import { ChildFirstLevel } from './child_first_level_39.1';

export const ExampleContext = createContext(null);

export const ParentContextComponent = () => (
    <ExampleContext.Provider value={"Привет от современной фронтенд-разработки"}>
        <ChildFirstLevel />
    </ExampleContext.Provider>
);