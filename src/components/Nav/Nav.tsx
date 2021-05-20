import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Home from '../Assets/Home';
import Feed from '../Assets/Feed';
import Investment from '../Assets/Investment';
import Messages from '../Assets/Messages';
import UserButton from '../Buttons/UserButton';
import Logo from '../Assets/Logo';
import { AuthContext } from '../../Auth';
import app from '../FirebaseApp';
import { getDoc } from '../FirebaseApp';

function Nav() {
  const { currentUser } = useContext(AuthContext);

  const [selected, setSelected] = useState<string>('home');
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

  function handleClick(selected: string): void | Error {
    switch (selected) {
      case 'home':
        return setSelected('home');
      case 'feed':
        return setSelected('feed');
      case 'messages':
        return setSelected('messages');
      case 'investment':
        return setSelected('investment');
      case 'profile':
        return setSelected('profile');
      default:
        return new Error('failed to change selected nav value');
    }
  }

  return (
    <nav className='nav'>
      {showNavLi && <Logo className='logo' />}
      <ul className='nav_ul'>
        <Link
          to='/'
          className={selected === 'home' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('home')}
        >
          <Home className={selected === 'home' ? 'selected' : ''} />
          {showNavLi && <li className='nav_ul_a_li'>Home</li>}
        </Link>
        <Link
          to=''
          className={selected === 'feed' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('feed')}
        >
          <Feed className={selected === 'feed' ? ' feed selected' : 'feed'} />
          {showNavLi && <li className='nav_ul_a_li'>Feed</li>}
        </Link>
        <Link
          to='/investment'
          className={
            selected === 'investment' ? 'nav_ul_a selected' : 'nav_ul_a'
          }
          onClick={() => handleClick('investment')}
        >
          <Investment className={selected === 'investment' ? 'selected' : ''} />
          {showNavLi && <li className='nav_ul_a_li'>Investment</li>}
        </Link>
        <Link
          to='/chatRoom'
          className={selected === 'chatRoom' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('chatRoom')}
        >
          <Messages className={selected === 'chatRoom' ? 'selected' : ''} />
          {showNavLi && <li className='nav_ul_a_li'>Chatroom</li>}
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
                desc: userNameAndExp?.investExp,
              }}
              userImg={userNameAndExp?.profileImg}
            />
          ) : (
            <li className='nav_ul_a_li'>
              <img
                className='user-img'
                src={
                  userNameAndExp?.profileImg
                    ? userNameAndExp?.profileImg
                    : 'https://images.unsplash.com/photo-1611034540516-665df2bbdfd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
              />
            </li>
          )}
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
