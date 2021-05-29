import React from "react";
import googleImage from "../../assets/googleImage.png";
import githubImage from "../../assets/githubImage.png";
import styles from "./LoginPage.module.css";
import "../../GlobalStyles.css";

export const LoginPage = () => {
    
    const googlelogin = () => {window.open("http://localhost:4000/auth/google", "_self")};
    const githublogin = () => {
        window.open("http://localhost:4000/auth/github", "_self");
    };

    return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <h1>Login</h1>
        <div className={styles.googleContainer} onClick={googlelogin}>
          <img src={googleImage} alt="Google Icon" />
          <p>Login with Google</p>
        </div><br />

        <div className={`${styles.googleContainer} ${styles.githubContainer}`} onClick={githublogin}>
          <img src={githubImage} alt="Google Icon" />
          <p>Login with GitHub</p>
        </div>
      </div>
    </div>
  );
};
