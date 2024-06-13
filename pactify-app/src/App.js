import LoginPage from './Components/login.js';
import SignupPage from './Components/signup.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App(){
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    );
}

export default App;
