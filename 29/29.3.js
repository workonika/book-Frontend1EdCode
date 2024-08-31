<section>
    <form onSubmit={handleSubmit}>
        <label htmlFor="user-name">Имя пользователя: </label>
        <input type="text" id="user-name" value={userNameValue} onChange={handleChangeName} />

        <label htmlFor="user-password">Пароль: </label>
        <input type="password" id="user-password" value={passwordValue} onChange={handleChangePassword} />

        <input type="submit" value="Отправить" />
    </form>
</section>