import React from 'react';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHistory, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
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
          <FontAwesomeIcon icon={faHistory} />
          <span>History</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faChartLine} />
          <span>Analysis</span>
        </div>
      </section>

      <section className='sign-out'>
        <button>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Sign Out</span>
        </button>
      </section>
    </div>
  );
}
