import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/login.jsx';
import SignupPage from './Components/signup.jsx';
import ForgotPasswordPage from './Components/forgotPassword.jsx'
import HomePage from './Components/home.jsx'
import AccountInfoPage from './Components/accountInfo.jsx';
import NameChangeForm from './Components/nameChangeForm.jsx';
import EmailChangeForm from './Components/emailChangeForm.jsx';
import ContractOtherForm from './Components/contractOtherForm.jsx';
import ContractNDAForm from './Components/contractNDAForm.jsx';
import NotFoundPage from './Components/notFound.jsx';
import SignaturePad from './Components/signaturePad.jsx';
import ContractRentalForm from './Components/contractRentalForm.jsx';
import ContractPrenupForm from './Components/contractPrenupForm.jsx';
import RichEditor from './Components/richTextEditor.jsx';
import { UserProvider } from './UserContext.js';
import EditContract from './Components/editContract.jsx';


function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signUp" element={<SignupPage />} />
                <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/accountInfo" element={<AccountInfoPage />} />
                <Route path="/nameChange" element={<NameChangeForm />} />
                <Route path="/emailChange" element={<EmailChangeForm />} />
                <Route path="/otherContract" element={<ContractOtherForm />} />
                <Route path="/ndaContract" element={<ContractNDAForm />} />
                <Route path="/signature" element={<SignaturePad />} />
                <Route path="/rentalContract" element={<ContractRentalForm />} />
                <Route path="/richTextEditor" element={<RichEditor />} />
                <Route path="/prenupContract" element={<ContractPrenupForm />} />
                <Route path="/edit" element={<EditContract />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path ="/edit/:contractId" element = {<EditContract />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
