import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notify from '../../toast-utils';
import './loginPage.css';
import { TbReload } from "react-icons/tb";
import Grid from '@mui/material/Grid2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate('/home')
  }

  const handleLogin = async (e) => {
    e.preventDefault();


    debugger
    if (username === password) {
      sessionStorage.setItem('authToken', 'kgui');
      navigate('/gallery'); // Redirect after login
      notify.success('Login Success !')
    }
    else {
      notify.warning('user name and password is kamal')
    }
  };

  return (
    <>
      <div className='containerlogin'>
        <Grid container spacing={0}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <div className="login-container">
              <h2 className='logintext'>Login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <div className='inputlabel'>
                    <div className='label'>
                      <label style={{ color: 'white' }} className='label-text'>Email <span className='text-danger'>*</span></label>
                    </div>

                    <div className='input-lo'>
                      <input className="text-input"
                        type="text"
                        placeholder="Email *"
                        autoComplete='on'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className='inputlabel'>
                      <div className='label'>
                        <label style={{ color: 'white' }} className='label-text'>Password  <span className='text-danger'>*</span></label>
                      </div>

                      <div className='input-lo'>
                        <input className="text-input"
                          type="password"
                          placeholder="Password *"
                          autoComplete='off'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className='forgettext'>Forget Password ?</div>
                  </div>

                  <div className='inputlabel'>
                    <div className='label' style={{ display: 'flex' }}>
                      <label className='label-text' style={{
                        backgroundColor: 'grey', marginRight: '5px', width: '80px', color: 'white',
                        fontFamily: 'cursive', borderRadius: '4px', textAlign: 'center', fontWeight: '600'
                      }}>08743</label>

                      <div><TbReload className='label-text' style={{
                        cursor: 'pointer', padding: '5px 7px', fontSize: '20px', color: 'white'
                      }} /></div>
                    </div>
                    <div className='input-lo'>
                      <input className='text-input'
                        type="text"
                        placeholder="Captcha *"
                        required
                      />
                    </div>
                  </div>

                  <div className='button-section'>
                    <button className='submit-button' type="submit">Login</button>
                    <button className='home-button' onClick={handleHomePage} type='button'>Home</button>
                  </div>
                </div>

              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
