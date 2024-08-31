import { useEffect } from 'react';

const getOuterFnCallTime = () => Date.now();

export const FirstUseEffectComponent =  ()  =>  {
    console.log('1. FirstUseEffectComponent', getOuterFnCallTime());

    useEffect(() => {
        console.log('В useEffect FirstUseEffectComponent', Date.now());
    }, []);

    return (<div>
        Вывод FirstUseEffectComponent 
        {console.log('2. FirstUseEffectComponent', 
        getOuterFnCallTime())}
    </div>);
}

export const SecondUseEffectComponent = () => {
    console.log('1. SecondUseEffectComponent', getOuterFnCallTime());

    useEffect(() => {
        console.log('В useEffect SecondUseEffectComponent', Date.now());
    }, []);

    return (<div>
        <FirstUseEffectComponent />
        Вывод SecondUseEffectComponent 
        {console.log('2. SecondUseEffectComponent', 
        getOuterFnCallTime())}
    </div>);
};