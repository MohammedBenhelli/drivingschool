import React, {useState, useEffect} from 'react';
import {Card} from "react-bootstrap";

const StudentHome = () => {
    const [data, setData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInfo = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/studentInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + token,

                },
                body: JSON.stringify({token}),
            });
            console.log(res);
            const resJSON = await res.json();
            console.log(resJSON);
            setData(resJSON);
            setLoading(false);
        }
        getInfo();
    }, [refresh]);

    return (<>
        {loading && <h1>Loading</h1>}
        {!loading && <>
            <h2>Hello {data.student.user.first_name} {data.student.user.last_name}</h2>
            <h3>Total hours: {data.student.hours_left + data.student.hours_done}</h3>
            <h3>Hours left: {data.student.hours_left}</h3>
            <h3>Hours done: {data.student.hours_done}</h3>
            {data.appointments.length > 0 && <h2 className={'text-info'}>{data.appointments.length} appointments</h2>}
            {data.appointments.length > 0 && data.appointments.map((a, i) => <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Text>
                        Instructor: {`${a.instructor.user.first_name} ${a.instructor.user.last_name}`}
                    </Card.Text>
                    <Card.Text>
                        Place: {a.lieux}
                    </Card.Text>
                    <Card.Text>
                        Hour: {a.hour.split('T')[1]}
                    </Card.Text>
                    <Card.Text>
                        Date: {a.date}
                    </Card.Text>
                </Card.Body>
            </Card>)}
            {data.appointments.length === 0 && <h2 className={'text-info'}>No appointments !</h2>}
        </>}
    </>);
}

export default StudentHome;
