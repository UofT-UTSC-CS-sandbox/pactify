import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/login.jsx';
import SignupPage from './Components/signup.jsx';
import ForgotPasswordPage from './Components/forgotPassword.jsx'
import HomePage from './Components/home.jsx'
import AccountInfoPage from './Components/accountInfo.jsx';


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
