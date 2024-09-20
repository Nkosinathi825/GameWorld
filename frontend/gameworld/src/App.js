import React, { useContext } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/Approutes';
import UserRoutes from './routes/UserRoutes';
import { UserContext } from './context/UserProvider';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.token ? (
        <div className="App">
          <section className='sidebar'>
            <Sidebar />
          </section>
          <section className='dashboard'>
            <UserRoutes />
          </section>
        </div>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;
