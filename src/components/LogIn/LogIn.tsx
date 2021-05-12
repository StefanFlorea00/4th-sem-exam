import React, { useCallback, useContext, useState } from 'react';
import app from '../FirebaseApp';
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
        await app.auth().signInWithEmailAndPassword(
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
    <div className='login_wrapper'>
      <div className='login'>
        <h1 className='login_header'>Log In</h1>
        {formElementErr && <div className='login_error'>{formElementErr}</div>}

        <form className='login_form' onSubmit={handleSignup}>
          <div className='login_form_email_div'>
            <label className='login_form_email_div_label'> Email</label>
            <input
              className='login_form_email_div_input'
              type='email'
              name='email'
              placeholder='Type your Email'
            />
          </div>

          <div className='login_form_password_div'>
            <label className='login_form_password_label'> Password</label>
            <input
              className='login_form_password_div_input'
              type='password'
              name='password'
              placeholder='Type your password'
              minLength={6}
            />
          </div>
          <div className='login_form_account_message'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </div>
          <button className='login_form_button'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(LogIn);
