export const RegistrationField = ({ defaultValue }) => {

    /** код компонента */

    const handleChangeEmail = (e) => {/** код обработчика */};

    const handleChangePassword = (e) => {/** код обработчика */};

    return (
        <Fragment>
            <input type="email" name="email" onChange={handleChangeEmail} />
            <input type="password" name="password" onChange={handleChangePassword} />
        </Fragment>
    );
}