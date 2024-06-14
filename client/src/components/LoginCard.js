import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCard.css';

export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (response.status === 200) {

                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/tasks');
            } else {
                console.error('Erro ao autenticar:', data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    }

    return (
        <div>
            <div id="card">
                <div id="card-content">
                    <div id="card-title">
                        <h2>LOGIN</h2>
                        <div className="underline-title"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="form">
                        <label htmlFor="user-email">
                            Email
                        </label>
                        <input id="user-email" className="form-content" type="email" name="email" autoComplete="on" required onChange={(e) => setEmail(e.target.value)} />
                        <div className="form-border"></div>
                        <label htmlFor="user-password">&nbsp;Password
                        </label>
                        <input id="user-password" className="form-content" type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                        {/* <div className="form-border"></div>
                        <a href="a.com">
                            <legend id="forgot-pass">Forgot password?</legend>
                        </a> */}
                        <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
                        {/* <a href="amazon.com" id="signup">Don't have account yet?</a> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
