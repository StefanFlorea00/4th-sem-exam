import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='nav'>
      <ul className='nav_ul'>
        <Link to='' className='nav_ul_a'>
          <li className='nav_ul_a_li'>Home</li>
        </Link>
        <Link to='' className='nav_ul_a'>
          <li className='nav_ul_a_li'>Feed</li>
        </Link>
        <Link to='' className='nav_ul_a'>
          <li className='nav_ul_a_li'>Investment</li>
        </Link>
        <Link to='' className='nav_ul_a'>
          <li className='nav_ul_a_li'>Messages</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
