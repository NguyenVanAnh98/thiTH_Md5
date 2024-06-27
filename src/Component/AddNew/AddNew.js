import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddNew() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const formAdd = useFormik({
        initialValues: {
            bookId: "",
            name: "",
            categoryId: "",
            date: "",
            quantity: "",
        },
        validate: (values) => {
            const errors = {};


            if (!/^BO-\d{4}$/.test(values.bookId)) {
                errors.bookId = "Mã sách phải có định dạng BO-XXXX, với XXXX là các số.";
            }

            if (values.name.length > 100) {
                errors.name = "Tên sách không được dài quá 100 ký tự.";
            }


            const currentDate = new Date().toISOString().slice(0, 10);
            if (values.date > currentDate) {
                errors.date = "Ngày nhập sách không được lớn hơn ngày hiện tại.";
            }

            const quantity = parseInt(values.quantity);
            if (isNaN(quantity) || quantity <= 0) {
                errors.quantity = "Số lượng sách phải là số nguyên lớn hơn 0.";
            }

            return errors;
        },
        onSubmit: (values) => {
            axios.post('http://localhost:3000/books', values)
                .then(() => {
                    alert("Book added successfully");
                    navigate("/books");
                })
                .catch(error => {
                    console.error('Error adding book:', error);
                });
        },
    });

    return (
        <>
            <form className="form" onSubmit={formAdd.handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">BookId</label>
                    <input name="bookId" onChange={formAdd.handleChange} value={formAdd.values.bookId} type="text" className="form-control"/>
                    {formAdd.errors.bookId && <div className="text-danger">{formAdd.errors.bookId}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" onChange={formAdd.handleChange} value={formAdd.values.name} type="text" className="form-control"/>
                    {formAdd.errors.name && <div className="text-danger">{formAdd.errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" name='categoryId' onChange={formAdd.handleChange} value={formAdd.values.categoryId} aria-label="Select category">
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input name="date" onChange={formAdd.handleChange} value={formAdd.values.date} type="date" className="form-control"/>
                    {formAdd.errors.date && <div className="text-danger">{formAdd.errors.date}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input name="quantity" onChange={formAdd.handleChange} value={formAdd.values.quantity} type="text" className="form-control"/>
                    {formAdd.errors.quantity && <div className="text-danger">{formAdd.errors.quantity}</div>}
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to={"/"}>
                        <button className="btn btn-info">Cancel</button>
                    </Link>
                </div>
            </form>
        </>
    );
}
