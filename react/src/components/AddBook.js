import React, { useState } from 'react'
import { postData } from '../helper/request';

const AddBook = () => {
    const [book, setBook] = useState({
        author: '',
        title: '',
        description: '',
        published_year: '',
        language: ''
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    }

    const resetState = () => {
        setBook({
            author: '',
            title: '',
            description: '',
            published_year: '',
            language: ''
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(Number(book.published_year)===-1){
            alert('First select language!');
            return ;
        }
        postData(`http://localhost:8081/api/user/books`, book)
            .then(res => {
                if (res.status === 1) {
                    alert('Book added successfully!');
                    resetState();
                }
                else {
                    alert(res.error);
                }
            });
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card w-50">
                <div className="card-body">
                    <h3 className="card-title">Add Book</h3>
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Author Name</label>
                            <input type="text" name="author" className="form-control" value={book.author} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" name="title" className="form-control" value={book.title} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea type="text" name="description" className="form-control" value={book.description} onChange={handleOnChange} rows={3} required ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Published Year</label>
                            <input type="number" name="published_year" className="form-control" value={book.published_year} min='1900' max={new Date().getFullYear()} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Language</label>
                            <select className="form-select" name="language" value={book.language} onChange={handleOnChange} >
                                <option value='-1'>Select Language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBook