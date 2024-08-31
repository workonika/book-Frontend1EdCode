import React, { useId } from 'react';

export const Form = () => {
  const id = useId();
  return (
    <form>
      <label htmlFor={id + '-firstName'}>Имя:</label>
      <input id={id + '-firstName'} type="text" />
      <hr />
      <label htmlFor={id + '-lastName'}>Фамилия:</label>
      <input id={id + '-lastName'} type="text" />
    </form>
  );
}