export const PropertyMethodDemo = () => {

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(e.currentTarget);
    }

    return (
        <div onClick={handleClick}>
            <a href="https://piter.com">Сайт издательского дома "Питер"</a>
        </div>
    );
}