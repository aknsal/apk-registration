
import {GoogleLogin} from 'react-google-login';
import Navbar from './components/navbar/Navbar';

import theme from "./themes/theme";
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EventPage from './pages/eventPage/EventPage';
import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import "./App.css"
import Events from './pages/events/Events';
import LoginError from './pages/loginError/LoginError';
import LoginSuccess from './pages/loginSuccess/LoginSuccess';
import Welcome from './pages/welcome/Welcome';
import AddEventPage from './pages/addEvent/AddEventPage';
import Dashboard from './pages/dashboard/Dashboard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfilePage from './pages/profilePage/ProfilePage';

function App() {
  const googleSuccess = (res) => {
    console.log(res);
  }


  const googleFailure = () => {
    console.log("Google Sign in was unsuccessful")
  }

  console.log(theme);

  const user = useSelector(state => state.app.authUser);
  // console.log("user Details", user);

  return (
    
      <ThemeProvider theme = {theme}>
          <CssBaseline />
    <Router>
          <Layout />
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/eventpage/:eventCode" element={<EventPage />} />
            <Route path="login/error" element={<LoginError />}/>
            <Route path="login/success" element={<LoginSuccess />}/>
            <Route path="Welcome" element={<Welcome />}/>
            {user && user.isAdmin? <Route path="/addevent" element={<AddEventPage />}/> :null }
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/profile" element={<ProfilePage />}/>
          </Routes>
    </Router>
      </ThemeProvider>
     
    
  );
}

export default App;
