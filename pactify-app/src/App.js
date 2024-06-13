import LoginPage from './Components/login.js';
import SignupPage from './Components/signup.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App(){
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignupPage />} />
        </Routes>
    );
}

export default App;
