import React, { useEffect, useState } from 'react'
import { getData } from '../helper/request'

import EditBook from './EditBook';

function UsersBook() {
    const [books, setBooks] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [show, setShow] = useState(false);

    const getBooks = () => {
        getData(`http://localhost:8081/api/user/books`)
            .then(res => {
                if (res.status === 1) {
                    setBooks(res.data);
                }
            })
    }

    const handleClose = () => {
        setShow(false);
        getBooks();
    };

    const handleShow = (e,value) => {
        setModalData(value);
        setShow(true)
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value })
    }

    useEffect(() => {
        getBooks();
    }, [])
    return (
        <div className='container mt-4'>
            <div className='row justify-content-between'>
                {
                    books ?
                        books.map((value, index) => {
                            return (<>
                                <div className="card col-md-4 w-33 my-3">
                                    <div className="card-body">
                                        <span className="badge text-bg-success">Author-{value.author}</span>
                                        <h5 className="card-title mt-2">{value.title}</h5>
                                        <p className="card-text">{value.description}</p>
                                        <div className='d-flex justify-content-between'>
                                            {/* <h1>{value}</h1> */}
                                            <span className="badge text-bg-danger">Language-{value.language}</span>
                                            <span className="badge text-bg-primary">Year-{new Date(value.published_year).getFullYear()}</span>
                                        </div>
                                        <div className='mt-2'>
                                            <button type="button" className="btn btn-outline-info" onClick={e => handleShow(e, value)}>
                                                Edit Book
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )
                        })
                        : <div>No Record found!</div>
                }
                <EditBook show={show} onClose={handleClose} data={modalData} handleOnChange={handleOnChange} />
            </div>
        </div>
    )
}


export default UsersBook