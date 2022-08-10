import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postData } from "../helper/request";
import { setUser } from "../redux/actions";


function Login() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.user) {
            navigate('/user/view-book');
        }
    }, []);

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setLogin({
            ...login,
            [name]: value
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postData(`http://localhost:8081/api/login`, login)
            .then(res => {
                if (res.status === 1) {
                    const user = res.data;
                    const role = user.role;
                    dispatch(setUser({ user }));
                    if (role.includes('CREATOR')) navigate('/creator/add-book');
                    else navigate('/user/view-book')
                }
                else alert(JSON.stringify(res.error));
            });
    }
    return (
        <div className="text-center align-login">
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleOnSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign In</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" placeholder="name@example.com" onChange={handleOnChange} />
                        <label>Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleOnChange} />
                        <label>Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mt-5" type="submit">LOG IN</button>
                    <label className="form-label mt-3">New user? <span><NavLink to='/registration'>Sign up</NavLink></span></label>
                </form>
            </main>
        </div>
    );
}

export default Login;