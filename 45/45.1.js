import { useState, Fragment } from 'react';
import { useLocation } from 'react-hook-effect';

export const ConditionHook = () => {
    const [authenticated, setAuthenticated] = useState(true);
    
    if (!authenticated) {
        const { assign } = useLocation();
        assign('/signin');
    }

    const handleClick = () => setAuthenticated(authenticated => !authenticated);

    return (<Fragment>
        <p>Тест переадресации. Сейчас пользователь аутентифицирован. Сделаем его.</p>
        <button onClick={handleClick}>
            {authenticated ? 'Разаутентифицироваться' : 'Аутентифицироваться'}
        </button>
    </Fragment>);
};