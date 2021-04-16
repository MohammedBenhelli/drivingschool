import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const signOut = () => {
        localStorage.clear();
        history.push('')
    }
    return (<Navbar bg="info" expand="lg">
        <Navbar.Brand className={'text-white'} style={{fontSize: '29px'}}>Driving School</Navbar.Brand>
        {/*{localStorage.getItem('token') && <Button variant={'danger'} onClick={() => signOut()}>Sign out</Button>}*/}
    </Navbar>);
}

export default Header;
