const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const Months = ({ months, startFrom = 0 }) => {
    const [currentMonth, setCurrentMonth] = useState(startFrom);
    const [isReset, setIsReset] = useState(false);

    const handleChangeMonth = (count) => {
        const monthsLength = months.length;
        if (count === monthsLength) {
            setIsReset(true);
        } else {
            setIsReset(false);
            setCurrentMonth(count);
        }
    }

    return (
        <Fragment>
            <div>{months[currentMonth]}</div>
            <ButtonChanger onClick={handleChangeMonth} reset={isReset} />
        </Fragment>
    );
}

const ButtonChanger = ({ onClick, reset, startFrom = 0, decrement = false }) => {
    const [count, setCount] = useState(startFrom);
    const changeCount = (count) => decrement ? count - 1 : count + 1;

    const handleClick = () => {
        const nextCount = reset ? startFrom : changeCount(count);

        setCount(nextCount);
        onClick(nextCount);
    }

    return (<button onClick={handleClick}>{count}</button>);
}