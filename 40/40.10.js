export const ValidateAttributes = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const [{ validityState }] = e.target.elements;
        console.log(validityState);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <input required name="simpletext" />
            <button type="submit">Отправить</button>
        </form>
    );
}