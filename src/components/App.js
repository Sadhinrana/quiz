import '../styles/App.css';
import Layout from "./Layout";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/signup" element={<PublicRoute/>}>
                            <Route path="/signup" element={<Signup/>} />
                        </Route>
                        <Route path="/login" element={<PublicRoute/>}>
                            <Route path="/login" element={<Login/>} />
                        </Route>
                        <Route path="/quiz/:id" element={<PrivateRoute/>}>
                            <Route path="/quiz/:id" element={<Quiz/>} />
                        </Route>
                        <Route path="/result" element={<PrivateRoute/>}>
                            <Route path="/result" element={<Result/>} />
                        </Route>
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
}

export default App;
