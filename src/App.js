import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from './components/TodosList';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Todos</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Todo</Link>
            </li>
          </ul>
        </nav>
        <br />
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </Router >
  );
}

export default App;
