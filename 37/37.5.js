import { useEffect } from 'react';

export const EventResizeDOMElement = () => {
    const handleResize = () => {/** код обработчика */}

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <main>{/** JSX-содержимое вывода */}</main>
    );
}