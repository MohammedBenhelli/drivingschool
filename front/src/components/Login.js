import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({});
    const [error, setError] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')) history.push('studentHome');
    }, []);

    const submitForm = async () => {
        setError(false);
        try {
            console.log(form)
            const res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(form),
            });
            console.log(res);
            const resJSON = await res.json();
            if (resJSON.token) {
                localStorage.setItem('token', resJSON.token);
                localStorage.setItem('role', resJSON.account.role);
                if (resJSON.account.role === 'Student')
                    history.push('studentHome')
            } else {
                setError(true)
            }
            console.log(resJSON);
        } catch (e) {
            setError(true);
        }
    }

    return (<Form>
        {error && <h2 className={'text-danger'}>Wrong credentials !</h2>}
        <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setForm({...form, username: e.target.value})}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
        </Form.Group>
        <Button variant="primary" onClick={() => submitForm()}>
            Login
        </Button>
        <Button variant="secondary" onClick={() => history.push('register')}>
            Register
        </Button>
    </Form>);
}

export default Login;
