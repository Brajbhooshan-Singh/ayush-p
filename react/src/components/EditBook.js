import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { postData } from '../helper/request';

const EditBook = (props) => {
    const { show, onClose, data, handleOnChange } = props;

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setBooks({ ...book, [name]: value })
    // }

    const handleUpdate = (e) => {
        e.preventDefault();
        postData(`http://localhost:8081/api/user/books/edit`, props.data)
            .then(res => {
                if (res.status === 1) {
                    alert('Book updated successfully!');
                    onClose();
                }
                else {
                    alert(res.error);
                }
            });
    }
    const handleDelete = (e) => {
        e.preventDefault();
        postData(`http://localhost:8081/api/user/books/delete`, props.data)
            .then(res => {
                if (res.status === 1) {
                    alert('Book deleted successfully!');
                    onClose();
                }
                else {
                    alert(res.error);
                }
            });
    }

    return (
        <Modal show={props.show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Author Name</label>
                        <input type="text" name="author" className="form-control" value={data?.author} onChange={handleOnChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" value={data?.title} onChange={handleOnChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea type="text" name="description" className="form-control" value={data?.description} rows={3} onChange={handleOnChange} required ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Published Year</label>
                        <input type="number" name="published_year" className="form-control" value={new Date(data?.published_year).getFullYear()} min='1900' max={new Date().getFullYear()} onChange={handleOnChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Language</label>
                        <select className="form-select" name="language" value={data?.language} onChange={handleOnChange} >
                            <option value='-1'>Select Language</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="submit" className="btn btn-success" onClick={handleUpdate}>Update</button>
                        <button type="submit" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditBook