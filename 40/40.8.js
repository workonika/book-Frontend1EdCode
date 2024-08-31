export const ValidateAttributes = () => (
    <form>
        <p>reuired <input required name="simpletext" /></p>
        <p>type=url <input type="url" name="url" /></p>
        <p>pattern <input name="text" pattern="[A-Z]{3}" /></p>
        <p>min max <input type="number" name="number" min={2} max={12} /></p>
        <p>minlength maxlength <input name="lastname" minLength={5} maxLength={20} /></p>
        <button type="submit">Отправить</button>
    </form>
);