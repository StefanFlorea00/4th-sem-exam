import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Home from '../Assets/Home';
import Feed from '../Assets/Feed';
import Investment from '../Assets/Investment';
import Messages from '../Assets/Messages';
import UserButton from '../Buttons/UserButton'
import Logo from '../Assets/Logo';
import { AuthContext } from '../../Auth';
import { getUser } from '../FirebaseApp';

function Nav() {
  const { currentUser } = useContext(AuthContext);
  

  const [selected, setSelected] = useState<string>('home');
  const [showNavLi, setShowNavLi] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setShowNavLi(true);
      } else {
        setShowNavLi(false);
      }
    });
    getUser(currentUser)
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
          to=''
          className={
            selected === 'investment' ? 'nav_ul_a selected' : 'nav_ul_a'
          }
          onClick={() => handleClick('investment')}
        >
          <Investment className={selected === 'investment' ? 'selected' : ''} />
          {showNavLi && <li className='nav_ul_a_li'>Investment</li>}
        </Link>
        <Link
          to=''
          className={selected === 'messages' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('messages')}
        >
          <Messages className={selected === 'messages' ? 'selected' : ''} />
          {showNavLi && <li className='nav_ul_a_li'>Messages</li>}
        </Link>

        <Link
          to='/profile'
          className={selected === 'profile' ? 'nav_ul_a selected' : 'nav_ul_a'}
          onClick={() => handleClick('profile')}
        >
          <UserButton className={selected === 'profile' ? 'selected' : ''}  hasInfo userInfo={{name:"Jane Doe", desc:"Super Cool Chick"}}/>
          {showNavLi && <li className='nav_ul_a_li'></li>}
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
