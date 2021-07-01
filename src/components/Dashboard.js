import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const { docs } = useFirestore('Orders');
    const history = useHistory

    async function handleLogout() {
        setError('')
        try {
            await logout();
            history.pushState('/login')
        }
        catch {
            setError('Failed to log out')
        }

    }


    return (
        <div className="text-center" >
            <label style={{ float: 'center' }}><Link to='/Create' className='btn btn-primary w-10 mt-3'>CREATE ORDERS</Link></label>
            <Card style={{ float: 'center' }} className='prof-card mt-3 mb-4 '>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>{currentUser.email}
                    <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                    <Button variant='link' onClick={handleLogout}>Log Out</Button>
                </Card.Body>
            </Card>
            <div className="grid-container">
                <h1>ALL ORDERS</h1>
                {docs && docs.map(doc => (
                    <motion.div layout className='parent' key={doc.id}>
                        
                        <span style={{ padding: '1rem' }}><b>Email Address:</b> {doc.Recipent_employee_email_address}</span>
                        <span style={{ padding: '1rem' }}><b>Order placed by: </b>{doc.Name_of_person_who_placed_the_order}</span>
                        <br/>
                        <span style={{ padding: '1rem' }}><b>Company: </b>{doc.Name_of_company}</span>
                        <span style={{ padding: '1rem' }}><b>Date: </b>{doc.Date_on_which_the_order_was_placed}</span>
                        </motion.div>
                ))}
            </div>
        </div>
    )
}
