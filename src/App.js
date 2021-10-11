
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Projects from './components/Projects/Projects';
import Members from './components/Members/Members';
import WorkingGroup from './components/WorkingGroup/WorkingGroup';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthProvider from './AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="">
      <AuthProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Projects></Projects>
            </Route>
            <Route path="/projects">
              <Projects></Projects>
            </Route>
            <PrivateRoute path="/members">
              <Members></Members>
            </PrivateRoute>
            <PrivateRoute path="/working">
              <WorkingGroup></WorkingGroup>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
