import React from 'react';

const Admin = () => {

  return (
    <div className='admin'>
      <h1>Administration</h1>
      <div className='admin__access'>
        <ul>
          <li>
            <p>Name</p>
            <input></input>
          </li>
          <li>
            <p>Password</p>
            <input></input>
          </li>
          <li>
            <button>Submit</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Admin;