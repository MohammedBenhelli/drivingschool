import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";


const Register = () => {
    const [form, setForm] = useState({});
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')) history.push('studentHome');
    }, []);

    const submitForm = async () => {
        setError(false);
        if (form.password === form.password_confirm && typeof form.password === 'string' && form.password.length > 2 && form.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            const res = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(form),
            });
            console.log(res);
            const resJSON = await res.json();
            if(resJSON.token){
                localStorage.setItem('token', resJSON.token);
                localStorage.setItem('role', resJSON.account.role);
                history.push('studentHome')
            }
            console.log(resJSON);
        } else {
            setError(true);
        }
    }

    return (<Form>
        {error && <h2 className={'text-danger'}>Read yourself !</h2>}
        <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" onChange={e => setForm({...form, first_name: e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" onChange={e => setForm({...form, last_name: e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setForm({...form, email: e.target.value})}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password confirm</Form.Label>
            <Form.Control type="password" placeholder="Password confirm" onChange={e => setForm({...form, password_confirm: e.target.value})}/>
        </Form.Group>
        <Button variant="primary" onClick={() => submitForm()}>
            Create
        </Button>
        <Button variant="secondary" onClick={() => history.push('/')}>
            Login
        </Button>
    </Form>);
}

export default Register;
