import React, { useContext } from 'react';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHistory, faChartLine, faSignOutAlt, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserProvider'; 

export default function Sidebar() {
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser();
    // Optionally, show a notification or redirect the user
  };

  return (
    <div className='side-container'>
      <section className='side-title'>
        <h1>Game World</h1>
      </section>
      <section className='side-details'>
        <div>
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faGamepad} />
          <span>Games</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faHistory} />
          <span>History</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faChartLine} />
          <span>Analysis</span>
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
