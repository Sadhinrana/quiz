import {Link, useNavigate} from "react-router-dom";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Form from "./Form";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";

export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const {signup} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords don't match!");
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password, username);
            navigate ('/');
        } catch (e) {
            console.log(e);
            setError("Failed to create an account!");
            setLoading(false);
        }
    }

    return (
        <Form style={{height: "500px"}} onSubmit={handleSubmit}>
            <TextInput type="text"
                       placeholder="Enter name"
                       icon="person"
                       value={username}
                       onChange={e => setUsername(e.target.value)}
                       required
            />

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

            <TextInput type="password"
                       placeholder="Confirm password"
                       icon="lock_clock"
                       value={confirmPassword}
                       onChange={e => setConfirmPassword(e.target.value)}
                       required
            />

            <Checkbox
                text="I agree to the Terms & Conditions"
                value={agree}
                onChange={e => setAgree(e.target.value)}
                required
            />

            <Button disabled={loading} type="submit">
                <span>Submit Now</span>
            </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
}