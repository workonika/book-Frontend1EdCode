import { useRef, useEffect } from 'react';

export const FocusInput = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (<form>
        <input ref={inputRef} />
    </form>);
};