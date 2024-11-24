import React, { useState, useContext } from 'react';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHistory, faChartLine, faSignOutAlt, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserProvider'; 
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { logoutUser } = useContext(UserContext);
  const [active,setActive]= useState(1)
  const navigate=useNavigate()

  const handleLogout = () => {
    logoutUser();
    navigate('/login')
  };
  const handleChnage =(number)=>{
    switch (number) {
      case 1 :
        setActive(1)
      break
      case 2 :
        setActive(2)
      break
      case 3 :
        setActive(3)
      break
      case 4 :
        setActive(4)
      break
      default:
        setActive(1)
    }
  }

  return (
    <div className='side-container'>
      <section className='side-title'>
        <h1>Game World</h1>
      </section>
      <section className='side-details'>
        <div>
          <Link to={'/dashboard'} onClick={()=>{handleChnage(1)}} className={`link ${active ===1 ? 'active' :"" }`} >
          <span className='icon'><FontAwesomeIcon icon={faHouse} /></span>
          <span className='name'>Home</span>
          </Link>
        </div>
        <div>
          <Link to={'/thegame'} onClick={()=>{handleChnage(2)}} className={`link ${active ===2 ? 'active' :"" }`}>
          <span className='icon'><FontAwesomeIcon icon={faGamepad} /></span>
          <span className='name '>Games</span>
          </Link>
        </div>
        <div>
          <Link onClick={()=>{handleChnage(3)}} className={`link ${active ===3 ? 'active' :"" }`}>
            <span className='icon'><FontAwesomeIcon icon={faHistory} /></span>
            <span className='name'>History</span>
          </Link>
        </div>
        <div>
          <Link onClick={()=>{handleChnage(4)}} className={`link ${active ===4 ? 'active' :"" }`}>
            <span className='icon'><FontAwesomeIcon icon={faChartLine} /></span>
            <span className='name'>Analysis</span>
          </Link>
        </div>
      </section>

      <section className='sign-out'>
        <button type="button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Sign Out</span>
        </button>
      </section>
    </div>
  );
}
