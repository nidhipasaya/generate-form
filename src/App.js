import './App.css';
import Home from './component/Home';
import Navbar from './Layout/Navbar';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import GenerateForm from './component/GenerateForm';
import ResponsePage from './component/ResponsePage';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/GenerateForm' component={GenerateForm}></Route>
        <Route exact path='/ResponsePage/:id' component={ResponsePage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
