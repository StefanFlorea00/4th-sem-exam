import React, { useCallback, useContext, useState } from 'react';
import FirebaseApp from '../FirebaseApp';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth';

function LogIn({ history }) {
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
        setFormeElementErr(err.message);
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
