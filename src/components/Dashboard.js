import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import Modal from 'react-modal';
import { useAuth } from '../hooks/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const { docs } = useFirestore('Orders');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [CId,setCId] =useState("");
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [placeDate, setPlaceDate] = useState(null);
    const [company, setCompany] = useState(null);
    const [companyNo, setCompanyNo] = useState(null);
    const [gst, setGst] = useState(null);
    const [detail, setDetail] = useState(null);
    const [model, setModel] = useState(null);
    const [qty, setQty] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [dispatchDate, setDispatchDate] = useState(null);
    const [status, setStatus] = useState(null);
    
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
        <div className="dashboard-container text-center" >
            <label style={{ float: 'center' }}><Link to='/Create' className='btn btn-primary w-10 mt-3'>CREATE ORDERS</Link></label>
            <Card style={{ float: 'center' }} className='prof-card mt-3 mb-4 '>
                <Card.Body>
                    <h2 className='prof mb-4'>Profile</h2>
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
                        <br/>
                        <button type="button" class="btn btn-primary" onClick={() =>{setModalIsOpen(true); 
                            setCId(doc.id); 
                            setName(doc.Name_of_person_who_placed_the_order);
                            setPhone(doc.Phone_no_of_person_who_placed_the_order);
                            setPlaceDate(doc.Date_on_which_the_order_was_placed);
                            setCompany(doc.Name_of_company);
                            setCompanyNo(doc.Phone_number_of_company);
                            setGst(doc.GST_number_of_company);
                            setDetail(doc.Details_of_the_order);
                            setModel(doc.Model_design);
                            setQty(doc.Quantity_of_order);
                            setOrderType(doc.Type_of_order);
                            setDispatchDate(doc.Dispatched_date);
                            setStatus(doc.Order_status);}}>View Order</button>

                        <Modal ariaHideApp={false}
                               style={{overlay: {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex:5, backgroundColor: 'rgba(0, 0, 0, 0.09)'},
                                       content: {textAlign: 'center', top: '10%', left: "20%", right: '20%', bottom: '10%'}}}

                                isOpen={modalIsOpen} 
                                onRequestClose= {() => setModalIsOpen(false)}>
                                      <span style={{ padding: '1rem' }}><b>Order placed by: </b>{name}</span>
                                      <span style={{ padding: '1rem' }}><b>Company: </b>{company}</span>
                                      <div className="Orderdetail" style={{border:"solid black 1px"}} >
                                      <b textAlign="Center">Details of Order</b>
                                      <br></br>
                                      <table style={{width:'90%',margin:'5'}}>
                                      <tr> <td style={{textAlign:'left'}}> <b>Order Detail: </b> </td>  <td style={{textAlign:'right'}}> {detail} </td> </tr>
                                      <tr> <td style={{textAlign:'left'}}> <b>Quantity of Order: </b> </td>  <td style={{textAlign:'right'}}> {qty} </td> </tr>
                                      <tr> <td style={{textAlign:'left'}}> <b>Type of Order: </b> </td>  <td style={{textAlign:'right'}}> {orderType} </td> </tr>
                                      <tr> <td style={{textAlign:'left'}}> <b>Order Status: </b> </td>  <td style={{textAlign:'right'}}> {status} </td> </tr>
                                      
                                      </table>
                                      </div>  
                                  

                        </Modal>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
