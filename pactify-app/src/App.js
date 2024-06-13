import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/login.js';
import SignupPage from './Components/signup.js';
import ForgotPasswordPage from './Components/forgotPassword.js'
import HomePage from './Components/home.js'
import AccountInfoPage from './Components/accountInfo.js';


function App(){
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignupPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/accountInfo" element={<AccountInfoPage />} />
        </Routes>
    );
}

export default App;
