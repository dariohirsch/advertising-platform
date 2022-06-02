import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import routes from './config/routes';
import useAuth from './hooks/useAuth';

function App() {
  const { currentUser, logoutUser, loading } = useAuth();

  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        {routes({ currentUser, logoutUser, loading }).map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
