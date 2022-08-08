import '../styles/App.css';
import Layout from "./Layout";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/quiz" element={<Quiz/>}/>
                        <Route path="/result" element={<Result/>}/>
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
}

export default App;
