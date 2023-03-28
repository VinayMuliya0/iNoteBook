import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:'', email:"", password:'', cPassword:''})
    const [note, setNote] = useState({id:"", title:"", description:"", tag: ""});
    const nevigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name:name, email: email, password:password})
        })
        const json = await response.json();
        console.log(json);
        setNote({...note, [e.target.name]:e.target.value});
        console.log(json.success);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            nevigate('/')
            props.showAlert('Your Account is created', 'success');
        }else {
            props.showAlert('Invalid Credentials', 'danger');
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    };
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                    <div className="card my-5">
                        <div className="card-header bg-dark">
                            <h1 className='text-center text-white'>Sign In</h1>
                        </div>
                        <div className="card-body">
                            <form  onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={credentials.name} name='name' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="cPassword" value={credentials.cPassword} name='cPassword' onChange={onChange} />
                                </div>
                                <div className="mb-3 text-center">
                                    <button className='btn btn-dark mt-3'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
