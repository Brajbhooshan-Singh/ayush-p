import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getData } from "../helper/request";
import { setUserLogout } from "../redux/actions";


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const role = user?.user?.role;

    const handleOnClick = () => {
        getData(`http://localhost:8081/api/logout`)
            .then(res => {
                if (res.status === 1) {
                    dispatch(setUserLogout(user));
                    localStorage.clear("lastPath");
                    navigate('/login');
                }
                else alert(res.error);
            });
    }


    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <NavLink to={'/'} className="navbar-brand">CIS</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            role.includes('CREATOR') &&
                            <>
                                <li className="nav-item">
                                    <NavLink to={'creator/add-book'} className="nav-link">Create Books</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'creator/user-book'} className="nav-link">View Your books</NavLink>
                                </li>
                            </>
                        }
                        {
                            role.includes('VIEW_ALL') && <li className="nav-item">
                                <NavLink to={'user/view-book'} className="nav-link">View All Books</NavLink>
                            </li>
                        }

                    </ul>
                    <ul className="navbar-nav me-5 ">
                        {user?.user ? <li><a className="dropdown-item text-light" href="#" onClick={handleOnClick}>Logout</a></li>
                            : <li><a className="dropdown-item text-light" href="/login" >Login</a></li>}
                        {/* <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user?.user?.first_name}
                            </NavLink>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><NavLink className="dropdown-item" to={"user/profile"}>View profile</NavLink></li>
                                <li><a className="dropdown-item" href="#" onClick={handleOnClick}>Logout</a></li>
                            </ul>
                        </li> */}
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    {/* {user?.user && <><span className="text-light fs-5"> {user?.user?.first_name} </span><button className="btn btn-outline-danger ms-2" onClick={handleOnClick}>Logout</button></>} */}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;