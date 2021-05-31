import React, { useCallback, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import app from '../FirebaseApp';
import { Link } from 'react-router-dom';
import { Props } from './LogIn';
import { AuthContext } from '../../Auth';
import { auth, createUserDocument } from '../FirebaseApp';
export type formErrorTypes = {
  [key: string]: string;
};

function SignUp(props: Props) {
  const { history } = props;
  const [formElementErr, setFormeElementErr] = useState<null | string>(null);
  const [buttontext, setbuttonText] = useState('Sign up');
  const FormErrorMessages: formErrorTypes = {
    ['auth/invalid-email']: 'Email is invalid',
    ['auth/weak-password']: 'Password must be at least 6 characters long',
    ['auth/email-already-in-use']: 'Email already exists',
  };

  async function handleSignup(e: any) {
    e.preventDefault();
    const { email, password, confirmPassword, fullname, investmentExperience } =
      e.target.elements;
    const checkedRadioValue = [...investmentExperience].filter(
      radio => radio.checked
    )[0].value;

    try {
      if (password.value === confirmPassword.value) {
        const { user } = await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        setbuttonText('✓');
        await createUserDocument(user, {
          fullname: fullname.value,
          investExp: `${checkedRadioValue} Investor`,
        });
        history.push('/');
      } else {
        setFormeElementErr('Passwords do not match');
      }
    } catch (err) {
      setFormeElementErr(FormErrorMessages[err.code] || err.message);
      throw new Error(err.message);
    }
  }

  return (
    <div className='login_wrapper'>
      <div className='signup'>
        <h1 className='signup_header'>Sign Up</h1>
        {formElementErr ? (
          <div className='signup_error'> {formElementErr}</div>
        ) : (
          <div className='signup_msg'>Let's get to know you!</div>
        )}
        <form className='signup_form' onSubmit={handleSignup}>
          <div className='signup_form_email_div'>
            <label htmlFor='fullname' className='signup_form_email_div_label'>
              {' '}
              Full Name
            </label>
            <small>e.g Jane Doe</small>

            <input
              className='signup_form_email_div_input'
              type='fullname'
              name='fullname'
              id='fullname'
              // placeholder='Enter your full name'
              required
              placeholder=' '
            />
          </div>

          <div className='signup_form_email_div'>
            <label htmlFor='email' className='signup_form_email_div_label'>
              {' '}
              Email
            </label>
            <small>e.g JhonDoe@gmail.com</small>

            <input
              className='signup_form_email_div_input'
              type='email'
              name='email'
              required
              id='email'
              // placeholder='Enter your email'
              placeholder=' '
            />
          </div>

          <div className='signup_form_radio_div_wrapper'>
            <label className='signup_form_radio_label'>
              {' '}
              Investment experience
            </label>
            <small>We will use it to identify your investment experience</small>

            <div>
              <input
                required
                value='Beginner'
                type='radio'
                id='radio1'
                name='investmentExperience'
              />
              <label htmlFor='radio1'>Beginner</label>
            </div>
            <div>
              <input
                required
                value='intermediate'
                type='radio'
                id='radio2'
                name='investmentExperience'
              />
              <label htmlFor='radio2'>intermediate</label>
            </div>
            <div>
              <input
                required
                value='Expert'
                type='radio'
                id='radio3'
                name='investmentExperience'
              />
              <label htmlFor='radio3'>Expert</label>
            </div>
          </div>

          <div className='signup_form_password_div'>
            <label
              htmlFor='password'
              className='signup_form_password_div_label'
            >
              {' '}
              Password
            </label>
            <small>Must be longer than 6 characters</small>
            <input
              className='signup_form_password_div_input'
              type='password'
              name='password'
              id='password'
              // placeholder='Enter your password'
              placeholder=' '
              minLength={6}
              required
            />
          </div>

          <div className='signup_form_confirm_password_div'>
            <label
              htmlFor='confirmPassword'
              className='signup_form_confirm_password_div_label'
            >
              Confirm password
            </label>
            <small>Must match the password above</small>

            <input
              className='signup_form_confirm_password_div_input'
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              // placeholder='Enter your password again'
              placeholder=' '
              minLength={6}
              required
            />
          </div>
          <div className='signup_form_account_message'>
            Already have an account? <Link to='/login'>Log in</Link>
          </div>
          <button className='signup_form_button'>{buttontext}</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
