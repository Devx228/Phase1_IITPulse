import { useEffect, useState } from "react";
import styles from "./Result.module.scss";
import logo from "../../assets/images/logo.svg";
import { TEST_SUBMITTED } from "src/utils/constants";
import { useNavigate } from "react-router-dom";
// import {useAuth } from "src/utils/AuthWithURI/AuthWithURI";
// import { useAuth } from "../../utils/auth/AuthContext";
const Result = () => {
  const [timeTaken, setTimeTaken] = useState(5);

  const navigate = useNavigate();
  // const { logout } = useAuth();

  useEffect(() => {
    const isSubmitted = localStorage.getItem(TEST_SUBMITTED) === "true";
    if (!isSubmitted) {
      navigate("/");
    }
    localStorage.removeItem(TEST_SUBMITTED);
    localStorage.removeItem("remainingTime");
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTaken((prevTimeTaken) => prevTimeTaken - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeTaken < 1) {
      window.close();
    }
  });
  // useEffect(() => {
  //   if (timeTaken < 1) {
  //     if (logout) {
  //       logout();
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [timeTaken, logout, navigate]);

  return (
    <div className={styles.container}>
      <section className={styles.logoSection}>
        <div className={styles.imageContainer}>
          <img src={logo} alt="IIT Pulse" />
        </div>
      </section>
      <section className={styles.main}>
        <h1 style={{ lineHeight: "300%" }}>
          Thank you for submitting the test
        </h1>
        <p>This window will close in {timeTaken} sec</p>
      </section>
    </div>
  );
};

export default Result;
