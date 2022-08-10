import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { getData } from "../helper/request";
import { Creator, User } from "../ProtectedRoutes";
import { setUser } from "../redux/actions";
import AddBook from "./AddBook";
import Login from "./Login";
import Navbar from "./Navbar";
import Registration from "./Registration"
import UsersBook from "./UsersBook";
import ViewBook from "./ViewBook";

function UserSession() {
    return <Outlet />;
}

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const getTokenData = () => {
        getData(`http://localhost:8081/api/user/token`)
            .then(res => {
                if (res.status === 1) {
                    const user = res.data;
                    dispatch(setUser({ user }));
                    if(localStorage.getItem('lastPath')){
                        const lastPath = localStorage.getItem('lastPath');
                        navigate(lastPath);
                        localStorage.clear('lastPath');
                    }
                }
                else alert(res.error);
            })
            .catch( err=>{
                navigate('/login')
            })
    }

    useEffect(() => {
        getTokenData();

    }, []);

    const renderNavbar = ()=>{
        if(user?.user){
          return <Navbar />
        }
      }

    return (
        <Fragment>
            {renderNavbar()}
            <Routes>
                <Route path='creator' element={<UserSession />}>
                    <Route path="add-book" element={<Creator><AddBook /></Creator>} />
                    <Route path="user-book" element={<Creator><UsersBook /></Creator>} />
                </Route>
                <Route path="user" element={<UserSession />}>
                    <Route path="view-book" element={<User><ViewBook /></User>} />
                </Route>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Fragment>
    )
}

export default App;