import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider} from './contexts/UserContext';
import Navbar from './components/NavBar.jsx';
import Dashboard from "./components/Dashboard"
import Competitions from "./components/Competitions"
import "./App.css"

const App = () => { 

    return (
        <div style={{ width: '100vw' }}>
            <UserProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={ <Dashboard />} />
                        <Route path="/competitions" element={ <Competitions />} />

                    </Routes>
                </Router>
            </UserProvider>
        </div>
    );
};

export default App;
