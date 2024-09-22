import React, { useEffect, useState,useContext } from 'react';
import RegisterPicture from '../images/registerpic.png';
import sudoku1 from '../images/sudoku1.JPG';
import sudoku2 from '../images/SUDOKU2.png';
import math1 from '../images/math1.jpeg';
import math2 from '../images/math2.jpg';
import tick1 from '../images/tick1.png';
import tick2 from '../images/tick1.jpeg';
import snake1 from '../images/snake1.png'
import snake2 from '../images/snake2.png'
import { UserContext } from '../context/UserProvider'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.scss'; 

const images = [RegisterPicture, sudoku1,  math1,snake1, tick1,sudoku2, tick2,snake2, math2];

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
