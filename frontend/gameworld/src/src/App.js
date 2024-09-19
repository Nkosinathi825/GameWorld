import './App.scss';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AppRoutes from './pages/routes/Approutes';
import UserRoutes from './pages/routes/UserRoutes';


function App() {
  return (
    <div className="App">
      <section className='sidebar'> 
        <Sidebar/>
      </section>
      <AppRoutes/>
      <section className='dashboard'> 
        <UserRoutes/>
      </section>
     
    </div>
  );
}

export default App;
