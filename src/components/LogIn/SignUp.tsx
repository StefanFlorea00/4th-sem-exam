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
    <div className='signUp'>
      <h1>Sign Up</h1>
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

        <div>
          <label>Confirm password</label>

          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
          />
        </div>
        <button>Submit</button>

        <div>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default withRouter(SignUp);
