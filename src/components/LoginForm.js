import {Link, useNavigate} from "react-router-dom";
import TextInput from "./TextInput";
import Button from "./Button";
import Form from "./Form";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate ('/');
        } catch (e) {
            console.log(e);
            setError("Failed to login!");
            setLoading(false);
        }
    }

    return (
        <Form style={{height: "330px"}} onSubmit={handleSubmit}>
            <TextInput type="email"
                       placeholder="Enter email"
                       icon="alternate_email"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       required
            />

            <TextInput type="password"
                       placeholder="Enter password"
                       icon="lock"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       required
            />

            <Button disabled={loading} type="submit">
                <span>Submit Now</span>
            </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">
                Don't have an account? <Link to="/signup">Signup</Link> instead.
            </div>
        </Form>
    );
}