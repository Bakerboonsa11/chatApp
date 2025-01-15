import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginPage, changeLoginPage] = useState(false);
  const dispatch = useDispatch();

  // Access the Redux state
  const signUpFormData = useSelector((state) => state.signUpFormData);
  const authentication = useSelector((state) => state.authentication);
   const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  console.log('Authentication State:', authentication);
  console.log('Sign-Up Form Data:', signUpFormData);

  const handlesubmitsignUp = async (e) => {
    e.preventDefault();
    alert('The signup is about to proceed');
    console.log('Sign-Up Data at Submit:', signUpFormData);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/signUp',
        signUpFormData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      alert('Signup successful! Welcome, ' + response.data.name);
      dispatch({
        type: 'LOGGEDIN',
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response);
        alert('Signup failed: ' + error.response.data.message);
      } else if (error.request) {
        console.error('Error Request:', error.request.message);
        alert('Network Error. Please check your connection.');
      } else {
        console.error('Error Message:', error.message);
        alert('An unexpected error occurred: ' + error.message);
      }
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    alert('Login attempt in progress');

    try {
      console.log('Logging in with data:', loginFormData);

      const response = await axios.post(
        'http://localhost:8000/api/v1/user/signIn',
        loginFormData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('response is ',response)
      alert('Login successful! Redirecting to dashboard.');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response);
        alert('Login failed: ' + error.response.data.message);
      } else if (error.request) {
        console.error('Error Request:', error.request);
        alert('Network Error. Please check your connection.');
      } else {
        console.error('Error Message:', error.message);
        alert('An unexpected error occurred: ' + error.message);
      }
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px', padding: '20px', borderRadius: '10px' }}>
      <header className="text-center mb-4">
        <h1>Welcome to Our App</h1>
        <p className="lead">Join us and explore amazing features!</p>
      </header>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {!loginPage ? (
            <div className="card shadow-lg p-5">
              <h3 className="text-center mb-4">Sign Up</h3>
              <form onSubmit={handlesubmitsignUp}>
                <div className="mb-4">
                  <label htmlFor="signupName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="signupName"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATEDATA',
                        payload: { name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATEDATA',
                        payload: { email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="signupPhone"
                    className="form-control form-control-lg"
                    placeholder="Enter your phone number"
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATEDATA',
                        payload: { phoneNumber: e.target.value},
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    className="form-control form-control-lg"
                    placeholder="Create a password"
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATEDATA',
                        payload: { password: e.target.value},
                      })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-success btn-lg w-100 mb-3">
                  Sign Up
                </button>
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-lg w-50"
                    onClick={() => {
                      changeLoginPage(true);
                    }}
                  >
                    Login
                  </button>
                </span>
              </form>
            </div>
          )  : (
            <div className="card shadow-lg p-5">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleLogIn}>
                <div className="mb-4">
                  <label htmlFor="loginEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={loginFormData.email}
                    onChange={(e) =>
                      setLoginFormData({ ...loginFormData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={loginFormData.password}
                    onChange={(e) =>
                      setLoginFormData({ ...loginFormData, password: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                  Login
                </button>
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg w-50"
                    onClick={() => {
                      changeLoginPage(false);
                    }}
                  >
                    Sign Up
                  </button>
                </span>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
