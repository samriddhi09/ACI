import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { projectStorage, projectFirestore } from '../firebase'
import { FaHome } from 'react-icons/fa'
import { BiArrowBack } from 'react-icons/bi'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useHistory } from 'react-router-dom'


const Create = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [placeDate, setPlaceDate] = useState(new Date());
  const [company, setCompany] = useState(null);
  const [companyNo, setCompanyNo] = useState(null);
  const [gst, setGst] = useState(null);
  const [detail, setDetail] = useState(null);
  const [model, setModel] = useState(null);
  const [qty, setQty] = useState(null);
  const [orderType, setOrderType] = useState('Volvo');
  const [dispatchDate, setDispatchDate] = useState(null);
  const [status, setStatus] = useState('Recieved');
  const history = useHistory();
  const { currentUser } = useAuth()
  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const changeHandler = (e) => {

    let selected = e.target.files[0];


    if (selected && types.includes(selected.type)) {
      setFile(selected);

      setError('')
    } else {
      setFile(null);
      setError('Please select valid file type(jpeg,jpg or png)');
    }
  }
  const Upload = (e) => {
    if (file && name &&
      phone &&
      placeDate &&
      company &&
      companyNo &&
      gst &&
      detail &&
      model &&
      qty &&
      orderType &&
      dispatchDate &&
      status) {
      const storageRef = projectStorage.ref('Pics');
      const imageRef = storageRef.child(file.name);
      const collectionRef = projectFirestore.collection('Orders')


      imageRef.put(file).on('state_changed', (err) => {
        setError(err);
      }, async () => {
        const url = await imageRef.getDownloadURL();
        collectionRef.add({
          Recipent_employee_email_address: email,
          Name_of_person_who_placed_the_order: name,
          Phone_no_of_person_who_placed_the_order: phone,
          Date_on_which_the_order_was_placed: placeDate,
          Name_of_company: company,
          Phone_number_of_company: companyNo,
          GST_number_of_company: gst,
          Details_of_the_order: detail,
          Model_design: model,
          Model_image: url,
          Quantity_of_order: qty,
          Type_of_order: orderType,
          Dispatched_date: dispatchDate,
          Order_status: status,
        })

      })

      history.push('/')


    }
    else if (name &&
      phone &&
      placeDate &&
      company &&
      companyNo &&
      gst &&
      detail &&
      model &&
      qty &&
      orderType &&
      dispatchDate &&
      status) {
      const collectionRef = projectFirestore.collection('Orders')
      collectionRef.add({
        Recipent_employee_email_address: email,
        Name_of_person_who_placed_the_order: name,
        Phone_no_of_person_who_placed_the_order: phone,
        Date_on_which_the_order_was_placed: placeDate,
        Name_of_company: company,
        Phone_number_of_company: companyNo,
        GST_number_of_company: gst,
        Details_of_the_order: detail,
        Model_design: model,
        Model_image: '',
        Quantity_of_order: qty,
        Type_of_order: orderType,
        Dispatched_date: dispatchDate,
        Order_status: status,
      })
      history.push('/')
    }
    else { setError('Please fill out all the fields!') }




  }
  var email = currentUser.email


  //    const i =()=>{
  //        if(file && name.trim && price.trim ){
  //            setIndex(1)
  //        } 
  //        else{
  //         setError('Please fill all fields!')
  //        }

  //    }

  return (
    <div className="card-form">
      <button className='backbtn' ><Link to='/' style={{ color: '#fff', textDecoration: 'none', padding: 0 }}><BiArrowBack /> {'\u00A0'} <FaHome /></Link></button>
      <br/>
      <form className='AddProduct' >

        <div className="output">
          <h2 style={{ textAlign: 'center' }}><u>CREATE NEW ORDER</u></h2>

          <div className='container'>
            <div className='row'>
              <div className='col'>
                Recipent employee email address:<span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='text' placeholder={email} disabled={true}></input>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                Name of person who placed the order: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required></input>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                Phone Number of person who placed the order: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
              </div>
              <div className='col'>
                Date on which the order was placed: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <br />
                <DatePicker dateFormat='dd/MM/y' selected={placeDate} onChange={date => setPlaceDate(date)} />
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                Name of Company: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} ></input>
              </div>
              <div className='col'>
                Phone Number of Company:
                <input type='number' value={companyNo} onChange={(e) => setCompanyNo(e.target.value)} required></input>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                GST Number of Company:<span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='text' value={gst} onChange={(e) => setGst(e.target.value)} required></input>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                Details of the order:
                <textarea type='text' value={detail} onChange={(e) => setDetail(e.target.value)} required></textarea>
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                Artwork/Model Design:<span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='text' value={model} onChange={(e) => setModel(e.target.value)} required></input>
              </div>
              <div className='col'>
                Model image
                <br />
                <label className="button btn">
                  <input type='file' onChange={changeHandler} />
                  <span>Choose artwork image</span>
                </label>
                {file && <div>{file.name}</div>}
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                Quantity of order: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <input type='number' value={qty} onChange={(e) => setQty(e.target.value)} required></input>
              </div>
              <div className='col'>
                Type of order: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <select name={orderType} onChange={(e) => setOrderType(e.target.value)}>
                  <option value="Volvo">Volvo</option>
                  <option value="Saab">Saab</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Audi">Audi</option>
                </select>
              </div>
            </div>


            <div className='row'>
              <div className='col'>
                To Be Dispatched Date:
                <br />
                <DatePicker dateFormat='dd/MM/y' selected={dispatchDate} onChange={date => setDispatchDate(date)} />
              </div>
              <div className='col'>
                Order status: <span style={{ color: 'rgb(255, 74, 74)' }}> *</span>
                <select name={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Recieved">Recieved</option>
                  <option value="Ready">Ready</option>
                  <option value="Packaged">Packaged</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </div>

            <div className='row align-items-center'>
              <div className='col'>
                <br />
                <label className="button btn w-100" onClick={Upload}>
                  <span>Submit</span>
                </label>
                {error && <div style={{ color: 'rgb(255, 74, 74)', textAlign: 'center' }}>{error}</div>}
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>)
}

export default Create;