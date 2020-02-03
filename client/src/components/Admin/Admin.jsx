import React from 'react';

const Admin = () => {

  return (
    <div className='admin'>
      <h1>Administration</h1>
      <div className='admin__login'>
          <div className='admin__login__input'>
            <label>Name</label>
            <input type='text' name='name' placeholder='Name' size='20' required></input>
          </div>
          <div className='admin__login__input'>
            <label>Password</label>
            <input type='text' name='password' placeholder='Password' size='20' required></input>
          </div>
          <div className='admin__login__button'>
            <button type='submit'>Sign up</button>
          </div>
      </div>
    </div>
  )
}

export default Admin;