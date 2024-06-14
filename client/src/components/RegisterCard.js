import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterCard () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            navigate('/tasks')
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    }

    return (
        <div id="card">
            <h2>Register</h2>
            <label htmlFor="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" name="name" id="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" id="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" id="password" value={formData.password} onChange={handleChange} required />

            <button type="submit" className="registerbtn" onClick={handleSubmit}>Register</button>
        </div>
    );
}