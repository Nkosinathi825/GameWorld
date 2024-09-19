import React, { useEffect, useState } from 'react';
import RegisterPicture from '../images/registerpic.png';
import sudoku1 from '../images/sudoku1.JPG';
import sudoku2 from '../images/SUDOKU2.png';
import math1 from '../images/math1.jpeg';
import math2 from '../images/math2.jpg';
import tick1 from '../images/tick1.png';
import tick2 from '../images/tick1.jpeg';

import './Register.scss'; 

const images = [RegisterPicture,sudoku1, sudoku2 , math1,math2,tick1,tick2];

export default function Register() {
    const [name, setName] = useState('');
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
        <div className='contanier'>
            <main className='register-container'>
                <section className='the-image'>
                    <section className='image'>
                        <img src={images[currentImageIndex]} alt="changing pictures" />
                    </section>
                    <section className='details'>
                        <p>Have an account <a href="/register">Sign in</a></p>
                    </section>
                </section>
                <section className='register-details'>
                    <h1>Sign up</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <section className='inputs'>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name='name'
                                placeholder='Enter your name' 
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Use e instead of event
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
