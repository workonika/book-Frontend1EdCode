import { useEffect } from 'react';

const getOuterFnCallTime = () => Date.now();

export const UseEffectCallSequence = () => {
    console.log('В теле компонента', getOuterFnCallTime());

    useEffect(() => {
        console.log('В useEffect', Date.now());
    }, []);

    return (<div>Вывод UseEffectCallSequence 
        {console.log('Вывод из UseEffectCallSequence', 
        getOuterFnCallTime())}
    </div>);
};