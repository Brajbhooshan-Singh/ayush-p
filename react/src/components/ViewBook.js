import React, { useEffect, useState } from 'react'
import { getData } from '../helper/request'

const ViewBook = () => {
  const [allBooks, setAllBooks] = useState(null);

  const getAllBooks = () => {
    getData(`http://localhost:8081/api/books`)
      .then(res => {
        if (res.status === 1) {
          setAllBooks(res.data);
        }
        else {
          alert(res.error);
        }
      });
  }

  const handleOnClickNew = () => {
    getData(`http://localhost:8081/api/books?newer=1`)
      .then(res => {
        if (res.status === 1) {
          setAllBooks(res.data);
        }
        else {
          alert(res.error);
        }
      });
  }

  const handleOnClickOld = () => {
    getData(`http://localhost:8081/api/books?old=1`)
      .then(res => {
        if (res.status === 1) {
          setAllBooks(res.data);
        }
        else {
          alert(res.error);
        }
      });
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className='container mt-4'>
      <div>
        <button type="button" className="btn btn-secondary" onClick={handleOnClickNew}>Recent Books</button>
        <button type="button" className="btn btn-secondary mx-5" onClick={handleOnClickOld} >Books created 10 min. ago</button>
      </div>
      <div className='row justify-content-between'>
        {
          allBooks && allBooks.length ?
            allBooks.map((value, index) => {
              return (<>
                <div className="card col-md-4 w-33 my-3">
                  <div className="card-body">
                    <span className="badge text-bg-success">Author-{value.author}</span>
                    <h5 className="card-title mt-2">{value.title}</h5>
                    <p className="card-text">{value.description}</p>
                    <div className='d-flex justify-content-between'>

                      <span className="badge text-bg-danger">Language-{value.language}</span>
                      <span className="badge text-bg-primary">Year-{new Date(value.published_year).getFullYear()}</span>
                    </div>
                    <div className='mt-2'>
                    </div>
                  </div>
                </div>
              </>
              )
            })
            : <h2 className='text-center my-2'>No Record found!</h2>
        }
      </div>
    </div>
  )
}

export default ViewBook