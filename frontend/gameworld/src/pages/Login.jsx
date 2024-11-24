import React, { useEffect, useState,useContext } from 'react';
import snake1 from '../images/snake.jpg'

import mole from  '../images/mole.jpg'
import spelling from  '../images/spelling.avif'
import jump from '../images/jump.webp'
import math1 from '../images/math1.jpg'
import { UserContext } from '../context/UserProvider'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.scss'; 

const images = [ mole,  math1,jump, spelling,snake1];

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [status,setStatus]=useState('')
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(intervalId); 
    }, []);

    const handlerLogin = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const { user, token } = response.data; 
            loginUser(user._id, user.name, token);
            navigate('/Dashboard'); 
        } catch (error) {
            setStatus("Error registering user. Please try again."); 
        }
    };

    return (
        <div className='container'>
            <main className='login-container'>
                <section className='login-details'>
                    <h1>Sign in</h1>
                    <p>{status}</p>
                    <form onSubmit={handlerLogin}>
                        <section className='inputs'>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name='email'
                                placeholder='Enter your email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </section>
                        <section className='inputs'>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                name='password'
                                placeholder='Enter your password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </section>
                        <section className='button'>
                            <button type='submit'>Log in</button>
                        </section>
                    </form>
                </section>
                <section className='login-image'>
                    <section className='image'>
                        <img src={images[currentImageIndex]} alt="changing pictures" />
                    </section>
                    <section className='details'>
                        <p>Don't have an account? <a href="/register">Sign up</a></p>
                    </section>
                </section>
            </main>
        </div>
    );
}
