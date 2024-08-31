import { Fragment, useId } from 'react';

export const PasswordField = () => {
  const passwordHintId = useId();
  return (<Fragment>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        Пароль должен содержать по крайней мере 7 символов
      </p>
    </Fragment>);
}