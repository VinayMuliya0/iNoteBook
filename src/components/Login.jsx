import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:''})
    const nevigate = useNavigate()

    const handalSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password})
        })

        const json = await response.json();
        console.log(json);
        if(json.success === true) {
            //redirect
            localStorage.setItem('token', json.authtoken)
            nevigate('/')
            props.showAlert('Logged in Successfully', 'success');
        }else {
            props.showAlert('Please enter valid Email or Password', 'danger');
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    };
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card my-5">
                            <div className="card-header bg-dark">
                                <h1 className='text-center text-white'>Log In</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handalSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" value={credentials.password} name='password' onChange={onChange} id="password" />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    </div>
                                    <div className="mb-3 text-center">
                                        <button type="submit" className="btn btn-dark">Submit</button>
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

export default Login