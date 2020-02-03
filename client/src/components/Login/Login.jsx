import React, { useState } from 'react';

const Login = () => {

  const[input, setInput] = useState({
    name:'',
    password: ''
  });

  //const[errorMessage, setErrorMessage] = useState('');

  const inputChange = (e) => {
    e.persist();
    setInput((previousInput) => ({
      ...previousInput, 
      [e.target.id]: e.target.value,
    }));
  }

  const login = async(e) => {
    e.preventDefault();
    const response = await fetch('/admin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
    });
    if (response.status === 200) {
      console.log(response.json())
      return await response.json();
    } else {
      const { error } = await response.json();
      console.log(error)
      return;
    }
  }
  return (
    <div className='admin'>
      <form onSubmit={login} className='admin_form'>
          <h1>Administration</h1>
          <div className='admin__login'>
              <div className='admin__login__input'>
                <label>Name</label>
                <input type='text' name='name' placeholder='Name' onChange={inputChange} required></input>
              </div>
              <div className='admin__login__input'>
                <label>Password</label>
                <input type='text' name='password' placeholder='Password' onChange={inputChange} required></input>
              </div>
              <div className='admin__login__button'>
                <button type='submit'>Sign up</button>
              </div>
          </div>
        </form>
    </div>
  )
}

export default Login;