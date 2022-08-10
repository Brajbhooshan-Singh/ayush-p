import React, { useState } from "react";
import { postData } from "../helper/request";

function Registration() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_no: '',
        password: '',
        address: '',
    });
    const [userRole, setUserRole] = useState({
        creator: false,
        viewer: false
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleOnChangeCheck = (e) => {
        const { name } = e.target;
        setUserRole({ ...userRole, [name]: !userRole[name] });
    }

    const handleOnSubmit = (e) => {
        let role = [];
        e.preventDefault();
        if (userRole.creator) {
            role.push('CREATOR', 'VIEWER')
        } if (userRole.viewer) {
            role.push('VIEW_ALL');
        }
        if (!userRole.creator && !userRole.viewer) {
            alert('Please select role first!');
            return;
        }
        const first_name = user.first_name;
        const last_name = user.last_name;
        const email = user.email;
        const phone_no = user.phone_no;
        const password = user.password;
        const address = user.address;

        const userData = { first_name, last_name, email, phone_no, password, address, role };
        postData(`http://localhost:8081/api/register`, userData)
            .then(res => {
                if (res.status === 1) {
                    alert('Registration successful!');
                    navigator('/login')
                } else {
                    alert(res.error);
                }
            });
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card w-50">
                <div className="card-body">
                    <h3 className="card-title">Sign up</h3>
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" name="first_name" className="form-control" value={user.first_name} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" name="last_name" className="form-control" value={user.last_name} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" value={user.email} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">phone_no</label>
                            <input type="tel" name="phone_no" className="form-control" value={user.phone_no} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" value={user.password} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" name="address" className="form-control" value={user.address} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Role</label>
                            <div className="d-flex">
                                <div className="form-check me-5">
                                    <input className="form-check-input" name="creator" type="checkbox" checked={userRole.creator} onChange={handleOnChangeCheck} />
                                    <label className="form-check-label" >
                                        Creator
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="viewer" type="checkbox" checked={userRole.viewer} onChange={handleOnChangeCheck} />
                                    <label className="form-check-label" >
                                        Viewer
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration;