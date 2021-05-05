import React, { useCallback, useContext, useState } from 'react';
import FirebaseApp from '../FirebaseApp';
import { withRouter, Redirect } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import { formErrorTypes } from './SignUp';

export type Props = {
  history: RouteComponentProps['history'];
  location: RouteComponentProps['location'];
  match: RouteComponentProps['match'];
};

function LogIn(props: Props) {
  const FormErrorMessages: formErrorTypes = {
    ['auth/invalid-email']: 'Email is invalid',
    ['auth/user-disabled']: 'Email is disabled',
    ['auth/user-not-found']: "Email doesn't exist",
    ['auth/wrong-password']: 'Wrong Password',
  };

  const { history } = props;
  const [formElementErr, setFormeElementErr] = useState<null | string>(null);
  const handleSignup = useCallback(
    async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;

      try {
        await FirebaseApp.auth().signInWithEmailAndPassword(
          email.value,
          password.value
        );

        history.push('/');
      } catch (err) {
        setFormeElementErr(FormErrorMessages[err.code] || err.message);
        throw new Error(err.message);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    <Redirect to='/' />;
  }
  return (
    <div className='logIn'>
      <h1>Log In</h1>
      {formElementErr && <div style={{ color: 'red' }}> {formElementErr}</div>}

      <form onSubmit={handleSignup}>
        <div>
          <label> Email</label>
          <input type='email' name='email' placeholder='Email' />
        </div>

        <div>
          <label> Password</label>
          <input type='password' name='password' placeholder='Password' />
        </div>

        <button>Submit</button>

        <div>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default withRouter(LogIn);
