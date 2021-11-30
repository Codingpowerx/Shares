import './App.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Upload from './components/Upload';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';

import { loadUser } from './actions/userActions'
import store from './store';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Route path = '/login' component={Login} exact />
        <Route path='/signup' component={SignUp} exact />
        <Route path='/password/forgot' component={ForgotPassword} exact />
        <Route path='/password/reset/:token' component={NewPassword} exact />
        <Route path= '/' component={Upload} exact />
      </div>
    </Router>
  );
}

export default App;
