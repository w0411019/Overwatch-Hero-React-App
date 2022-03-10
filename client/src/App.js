import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Delete from './components/Delete';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import { BrowserRouter as Router,
  Route, Switch} from 'react-router-dom';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';


import './css/app.css';

class App extends React.Component {

  render(){
    return (
      <React.Fragment>
        <Router>
          <Route path="*" component={NavBar} />
          <div id="main-content">
              <Switch>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/register" component={Register}/>
                <ProtectedRoute Route exact path="/heroes/create" component={CreateForm} />
                <ProtectedRoute Route exact path="/heroes/edit/:id" component={EditForm} />
                <ProtectedRoute Route exact path="/heroes/delete/:id" component={Delete} />
                <Route exact path="/" component={Main}/>
                <Route path="*" component={NoMatch} />
                {/* <Route path="*" render={props => <NoMatch {...props} />} /> */}
              </Switch>
            
          </div>
        </Router>
        <Footer />
      </React.Fragment>
    );
  } 
}

function NoMatch(props) {
  //let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{props.location.pathname}</code>
      </h3>
    </div>
  )
}

export default App;
