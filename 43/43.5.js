import { useRef } from 'react';

export const ParentComponent = () => {
    const domRef = useRef(null);

    const handleClick = () => {
        console.log('domRef', domRef);
    }

    return <Button ref={domRef} onClick={handleClick} />
}

export const Button = ({ ref, onClick }) => {
    return <button ref={ref} onClick={onClick}>Нажать</button>
}