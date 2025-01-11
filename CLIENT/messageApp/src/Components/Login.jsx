import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LOGIN} from '../states/actons'
import store from '../states/store';

const Login = () => {
  // const  = false; // Change this to false to show the signup form instead
  // const [showLogin,setLogin]=useState(false)
 const handlesubmit=(e)=>{
      e.preventDefault()
      alert('the sign up is about to procced ')
  //  connect the front end to backend end pooint and register the user

  // add credential to both backend and front end 

  // update the authentication state well 

  
 }
  console.log(store);
  console.log(store.getState().authentication)
   console.log(store.getState().signUpFormData)
  return (
    <div className="container my-5" style={{ maxWidth: "800px", padding: "20px", borderRadius: "10px" }}>
      {/* Header Section */}
      <header className="text-center mb-4">
        <h1>Welcome to Our App</h1>
        <p className="lead">Join us and explore amazing features!</p>
      </header>

      {/* Conditional Form Section */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {store.getState().authentication.isLoggedIn ? (
            // Login Form
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
          ) : (
            // Signup Form
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
                      store.dispatch({
                        type: "UPDATEDATA",
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
                      store.dispatch({
                        type: "UPDATEDATA",
                        payload: { email: e.target.value },
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
                      store.dispatch({
                        type: "UPDATEDATA",
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

          )}
        </div>
      </div>
    </div>
  );

};

export default Login;
