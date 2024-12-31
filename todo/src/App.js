import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Signup from './page/signup';
import Todo from './page/todo';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={Login} />
                <Route path="/signup" Component={Signup} />
                <Route path="/todo" Component={Todo} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
