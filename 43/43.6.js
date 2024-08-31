import { useRef } from 'react';

export const ParentComponent = () => {
    const domRef = useRef(null);

    const handleClick = () => {
        console.log('domRef', domRef);
    }
/** */
    return <Button tricky={domRef} onClick={handleClick} />
}

export const Button = ({ tricky, onClick }) => {
/** */
    return <button ref={tricky} onClick={onClick}>Нажать</button>
}