
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Create = () => {
    const [values, setValues] = useState({
        title: '',
        description: '',
        priority: 'medium'
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:5000/api/todos', values)
        .then((res) => {
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Submission Successful!',
                text: 'Your data has been submitted successfully.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/');
            });
        })
        .catch((err) => {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error submitting your data.',
                confirmButtonText: 'OK',
            });
        });
    };
    

    return (
        <div className='d-flex w-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 rounded'>
                <h1>Add a todo</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' name='title' className='form-control' placeholder='Enter your title'
                            onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='description'>Description:</label>
                        <textarea name='description' className='form-control' placeholder='Enter your description'
                            onChange={handleChange}></textarea>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
            </div>
        </div>
    );
};

export default Create;

