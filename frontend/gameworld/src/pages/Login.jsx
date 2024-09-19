import React, { useEffect, useState } from 'react';
import RegisterPicture from '../images/registerpic.png';
import sudoku1 from '../images/sudoku1.JPG';
import sudoku2 from '../images/SUDOKU2.png';
import math1 from '../images/math1.jpeg';
import math2 from '../images/math2.jpg';
import tick1 from '../images/tick1.png';
import tick2 from '../images/tick1.jpeg';

import './Login.scss'; 

const images = [RegisterPicture, sudoku1, sudoku2, math1, math2, tick1, tick2];

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className='container'>
            <main className='login-container'>
                <section className='login-details'>
                    <h1>Sign in</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
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
