import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/books?_expand=category')
            .then(res => {
                setBooks(res.data);
                setFilteredBooks(res.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        const filtered = books.filter(book =>
            book.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    return (
        <>
            <div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Search by Name</label>
                        <input
                            name="searchTerm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            type="text"
                            className="form-control"
                            placeholder="Enter book name"
                        />
                    </div>
                    <Link to={"/"}>
                        <button type="button" className="btn btn-pro">Cancel</button>
                    </Link>
                </form>
            </div>
            <Link to={`/books/create`}>
                <button type="button" className="btn btn-primary">Add New Book</button>
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code Book</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((book, index) => (
                    <tr key={book.id}>
                        <td>{index + 1}</td>
                        <td>{book.bookId}</td> {/* Displaying 'codeBook' assuming it's the property name */}
                        <td>{book.name}</td>
                        <td>{book.category.name}</td> {/* Assuming 'category' has a 'name' property */}
                        <td>{new Date(book.date).toLocaleDateString('en-GB')}</td>
                        <td>{book.quantity}</td>
                        {/* Add other columns as needed */}
                        <td>
                            {/* Example: Link to edit book */}
                            {/* <Link to={`/book/${book.id}/edit`}>
                                    <button type="button" className="btn btn-primary">Edit</button>
                                </Link> */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
