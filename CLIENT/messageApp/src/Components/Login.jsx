import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();

  // Access the Redux state
  const signUpFormData = useSelector((state) => state.signUpFormData);
  const authentication = useSelector((state) => state.authentication);

  console.log("Authentication State:", authentication);
  console.log("Sign-Up Form Data:", signUpFormData);

  const handlesubmit = async (e) => {
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
      console.log('Signup Successful:', response.data);
      alert('Signup successful! Welcome, ' + response.data.name);
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

 return (
  <div className="container my-5" style={{ maxWidth: '800px', padding: '20px', borderRadius: '10px' }}>
    <header className="text-center mb-4">
      <h1>Welcome to Our App</h1>
      <p className="lead">Join us and explore amazing features!</p>
    </header>

    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        {!authentication.isLoggedIn ? (
          <div className="card shadow-lg p-5">
            <h3 className="text-center mb-4">Sign Up</h3>
            <form onSubmit={handlesubmit}>
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
                      payload: { phoneNumber: e.target.value },
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
                      payload: { password: e.target.value },
                    })
                  }
                />
              </div>
              <button type="submit" className="btn btn-success btn-lg w-100">
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <div className="card shadow-lg p-5">
            <h3 className="text-center mb-4">Login</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="loginEmail" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
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
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default Login;
