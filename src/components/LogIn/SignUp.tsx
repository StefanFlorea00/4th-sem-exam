import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import FirebaseApp from '../FirebaseApp';
import { Link } from 'react-router-dom';
import { Props } from './LogIn';

export type formErrorTypes = {
  [key: string]: string;
};

function SignUp(props: Props) {
  const { history } = props;
  const [formElementErr, setFormeElementErr] = useState<null | string>(null);

  const FormErrorMessages: formErrorTypes = {
    ['auth/invalid-email']: 'Email is invalid',
    ['auth/weak-password']: 'Password must be at least 6 characters long',
    ['auth/email-already-in-use']: 'Email already exists',
  };

  const handleSignup = useCallback(
    async e => {
      e.preventDefault();
      const { email, password, confirmPassword } = e.target.elements;

      try {
        if (password.value === confirmPassword.value) {
          await FirebaseApp.auth().createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          history.push('/');
        } else {
          setFormeElementErr('Passwords do not Match');
        }
      } catch (err) {
        setFormeElementErr(FormErrorMessages[err.code] || err.message);
        throw new Error(err.message);
      }
    },
    [history]
  );

  return (
    <div className='login_wrapper'>
      <div className='signup'>
        <h1 className='signup_header'>Sign Up</h1>
        {formElementErr && (
          <div className='signup_error'> {formElementErr}</div>
        )}
        <form className='signup_form' onSubmit={handleSignup}>
          <div className='signup_form_email_div'>
            <label className='signup_form_email_div_label'> Email</label>
            <input
              className='signup_form_email_div_input'
              type='email'
              name='email'
              placeholder='Enter your email'
            />
          </div>

          <div className='signup_form_password_div'>
            <label className='signup_form_password_div_label'> Password</label>
            <input
              className='signup_form_password_div_input'
              type='password'
              name='password'
              placeholder='Enter your password'
              minLength={6}
            />
          </div>

          <div className='signup_form_confirm_password_div'>
            <label className='signup_form_confirm_password_div_label'>
              Confirm password
            </label>

            <input
              className='signup_form_confirm_password_div_input'
              type='password'
              name='confirmPassword'
              placeholder='Enter your password again'
              minLength={6}
            />
          </div>
          <div className='signup_form_account_message'>
            Already have an account? <Link to='/login'>Log in</Link>
          </div>
          <button className='signup_form_button'>Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
