import React, { Fragment, useContext } from 'react';
import { ExampleContext } from './parent_39.1';

export const ChildSecondLevel = () => {
    const example = useContext(ExampleContext);

    return (<Fragment>{example}</Fragment>);
}