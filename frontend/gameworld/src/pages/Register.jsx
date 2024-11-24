import React, { useEffect, useState  } from 'react';
import mole2 from  '../images/mole2.jpg'
import quize2 from '../images/quize1.jpg';
import spelling1 from  '../images/spelling1.avif'
import memory from  '../images/memory.webp'
import mole1 from  '../images/mole1.jpg'
import jump1 from "../images/jump2.jpg";

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Register.scss';

const images = [quize2,spelling1,memory,mole1,jump1,mole2];

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handlerRegister = async (e) => {
        e.preventDefault(); 

        try {
            await axios.post('http://localhost:5000/register', { name, email, password });
            setStatus("Registered successfully");
            navigate('/login'); 
        } catch (error) {
            setStatus("Error registering user. Please try again."); 
        }
    };

    return (
        <div className='container'> 
            <main className='register-container'>
                <section className='the-image'>
                    <section className='image'>
                        <img src={images[currentImageIndex]} alt="changing pictures" />
                    </section>
                    <section className='details'>
                        <p>Have an account? <Link to={'/login'}>Sign in</Link></p>
                    </section>
                </section>
                <section className='register-details'>
                    <h1>Sign up</h1>
                    <p>{status}</p>
                    <form onSubmit={handlerRegister}>
                        <section className='inputs'>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name='name'
                                placeholder='Enter your name' 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </section>
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
                            <button type='submit'>Sign up</button>
                        </section>
                    </form>
                </section>
            </main>
        </div>
    );
}
