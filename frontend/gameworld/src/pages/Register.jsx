import React, { useEffect, useState  } from 'react';
import RegisterPicture from '../images/registerpic.png';
import sudoku1 from '../images/sudoku4.webp';
import sudoku2 from '../images/sudoku5.avif';
import math1 from '../images/math1.jpeg';
import math2 from '../images/math2.jpg';
import tick1 from '../images/tick1.png';
import tick2 from '../images/tick1.jpeg';
import snake1 from '../images/snake.jpg'
import snake2 from '../images/snake4.jpg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Register.scss';

const images = [RegisterPicture, sudoku1,  math1,snake1, tick1,sudoku2, tick2,snake2, math2];

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
