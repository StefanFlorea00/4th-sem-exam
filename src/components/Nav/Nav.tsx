import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Home from '../Assets/Home';
import Investment from '../Assets/Investment';
import Messages from '../Assets/Messages';
import UserButton from '../Buttons/UserButton';
import Logo from '../Assets/Logo';
import { AuthContext } from '../../Auth';
import app from '../FirebaseApp';
import { getDoc } from '../FirebaseApp';

function Nav() {
  const { currentUser } = useContext(AuthContext);

  const [selected, setSelected] = useState<string | any>('home');
  const [showNavLi, setShowNavLi] = useState(false);
  const [userNameAndExp, setUserNameAndExp] = useState<any>();

  async function getCurrentUserData() {
    getDoc(app.auth().currentUser).then(data => {
      setUserNameAndExp(data);
    });
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setShowNavLi(true);
      } else {
        setShowNavLi(false);
      }
    });
    setUserNameAndExp(getCurrentUserData());
  }, []);

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setShowNavLi(true);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('nav')) {
      localStorage.setItem('nav', selected);
    }
    const navSelected = localStorage.getItem('nav');
    setSelected(navSelected);
  }, []);

  function handleClick(selected: string): void | Error {
    switch (selected) {
      case 'home':
        setSelected('home');
        localStorage.setItem('nav', 'home');
        break;
      case 'chatRoom':
        setSelected('chatRoom');
        localStorage.setItem('nav', 'chatRoom');
        break;
      case 'investment':
        setSelected('investment');
        localStorage.setItem('nav', 'investment');
        break;
      case 'profile':
        setSelected('profile');
        localStorage.setItem('nav', 'profile');
        break;
      default:
        return new Error('failed to change selected nav value');
    }
  }

  return (
    <nav className='nav'>
      {showNavLi && <Logo className='logo' />}
      <section className='nav_ul'>
        <Link
          to='/'
          className={selected === 'home' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('home')}
        >
          <Home className={selected === 'home' ? 'selected' : ''} />
          {showNavLi && <article className='nav_ul_a_li'>Home</article>}
        </Link>
        <Link
          to='/investment'
          className={
            selected === 'investment' ? 'nav_ul_a selected' : 'nav_ul_a'
          }
          onClick={() => handleClick('investment')}
        >
          <Investment className={selected === 'investment' ? 'selected' : ''} />
          {showNavLi && <article className='nav_ul_a_li'>Investment</article>}
        </Link>
        <Link
          to='/chatRoom'
          className={selected === 'chatRoom' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('chatRoom')}
        >
          <Messages className={selected === 'chatRoom' ? 'selected' : ''} />
          {showNavLi && <article className='nav_ul_a_li'>Chatroom</article>}
        </Link>

        <Link
          to='/profile'
          className={selected === 'profile' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('profile')}
        >
          {showNavLi ? (
            <UserButton
              className={selected === 'profile' ? 'selected' : ''}
              hasInfo
              userInfo={{
                name: userNameAndExp?.fullname,
                exp: userNameAndExp?.investExp,
              }}
              userImg={userNameAndExp?.profileImg}
            />
          ) : (
            <article
              className={
                selected === 'profile' ? 'nav_ul_a_li selected' : 'nav_ul_a_li'
              }
            >
              <img
                className='user-img'
                src={
                  userNameAndExp?.profileImg
                    ? userNameAndExp?.profileImg
                    : 'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
              />
            </article>
          )}
        </Link>
      </section>
    </nav>
  );
}

export default Nav;
