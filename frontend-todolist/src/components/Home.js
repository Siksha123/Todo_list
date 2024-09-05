import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Update from './Update';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const handleEditClick = (id) => {
        setSelectedTodoId(id);
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
        setSelectedTodoId(null);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/api/todos')
            .then(res => {
                const data = res.data;
                setData(data); 
                localStorage.setItem('todos', JSON.stringify(data)); 
            })
            .catch(err => console.error(err));
    };
    

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this todo!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/todos/${id}`)
                    .then(res => {
                        const updatedData = data.filter(item => item._id !== id);
                        setData(updatedData);
                        Swal.fire('Deleted!', 'The todo has been deleted.', 'success');
                    })
                    .catch(err => Swal.fire('Error!', 'There was an error deleting the todo.', 'error'));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'The todo was not deleted :)', 'info');
            }
        });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const filteredData = data.filter((d) => {
        return (
            d.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter === '' || d.status === statusFilter)
        );
    });

    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Todos</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-between mb-3'>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control w-50"
                    />
                    <select value={statusFilter} onChange={handleFilterChange} className="form-control w-25">
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <Link to="/create" className='btn btn-success'>Add New Todo</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((d, i) => (
                            <tr key={d._id}>
                                <td>{i + 1}</td>
                                <td>{d.title}</td>
                                <td>{d.description}</td>
                                <td>{d.status}</td>
                                <td>
                                    <Link to={`/read/${d._id}`} className='btn btn-sm btn-primary me-2'>Read</Link>
                                    <button className='btn btn-sm btn-primary me-2' onClick={() => handleEditClick(d._id)}>Edit</button>
                                    <button onClick={() => handleDelete(d._id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Update show={modalShow} handleClose={handleClose} todoId={selectedTodoId} fetchData={fetchData} />
        </div>
    );
};

export default Home;
