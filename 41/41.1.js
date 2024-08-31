import React from 'react';
import { LoginForm } from './LoginForm';

function withAuthCheck(Component) {

  return function(props) {
    if (!localStorage.getItem('token')) {
      return <LoginForm />;
    }

    return <Component {...props} />;
  };
}

function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={() => alert('Clicked')}>Click me</button>
    </div>
  );
}

export default withAuthCheck(App);
