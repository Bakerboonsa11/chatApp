import React from 'react';
import Login from '../src/Components/Login';
import styles from './stayles/app.module.css'; // Import the CSS module

function App() {
  return (
    <div
      className={`d-flex flex-lg-row flex-column ${styles["app-container"]}`} // Use styles.app-container
    >
      {/* Login Section */}
      <div
        className="col-lg-6"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box", // Ensure padding doesn't overflow
        }}
      >
        <Login />
      </div>

      {/* Image Section */}
      <div
        className="col-lg-6"
        style={{
          height: "100%",
          position: "relative",
          boxSizing: "border-box", // Ensure padding doesn't overflow
        }}
      >
        <div>
          <img src="/cars.png" className={`img-fluid ${styles.img}`} alt="..." />
        </div>
      </div>
    </div>
  );
}

export default App;
