import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
// import { Switch } from '@mui/material';
// import { Route } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from './StateProvider';
import Login from './Login';

function App() {
  // const [user, setUser] = useState(null);

  const [{ user }, dispatch] = useStateValue();
  return (
    // BME naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
      <Router>
      <Sidebar />
        <Routes>
          <Route path="/rooms/:roomId" element={<Chat />} />
        </Routes>
      </Router>
      </div>
      )} 
    </div>
  );
}

export default App;
