import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Appliance from './components/Appliance';
import "./App.css";
import GroupDescription from './components/GroupDescription';
import ApplianceDetails from './components/ApplianceDetails';
import Addappliance from './components/Addappliance';
import AddUser from './components/AddUser';
import YourAppliances from './components/YourAppliances';
import AddServiceHistory from './components/AddServiceHistory';
import DemoPaymentPage from './components/demoPayment';
import FakePaymentPage from './components/FakePaymentPage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/appliance" element={<Appliance />} />
                    <Route path='/group-description' element={<GroupDescription />} />
                    <Route path='/appliance-details' element={<ApplianceDetails/>}/>
                    <Route path='/add-appliance' element={<Addappliance/>}/>
                    <Route path='/add-user' element={<AddUser/>}/>
                    <Route path='/your-appliances' element={<YourAppliances/>}/>
                    <Route path='/add-service-history' element={<AddServiceHistory/>}/>
                    <Route path='/demo-payment' element={<DemoPaymentPage/>}/>
                    <Route path='/fake-payment-page' element={<FakePaymentPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
