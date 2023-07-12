import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DescriptionAlerts from "../../Common/alert/alert";
import styles from "./SignUp.module.scss";
import Link from "next/link";
import { signUpAPI } from "../../Constants/Api/Api";
import { useRouter } from "next/router";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [agree, setAgree] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
  const router = useRouter()

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const handleSubmit = (e) => {
    if (!agree) {
      setShowAlert(true);
      setAlertConfig({
        text: "Please agree to the terms and conditions to submit the form.",
        type: 'info'
      });
      setTimeout(() => {
        setShowAlert(false);
      }, 7000);
      return;
    }
    e.preventDefault();
    signUpAPI(name, email, password, confirmPassword)
      .then((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: "successfully register please check email and verify.",
        });
        setTimeout(() => {
          setShowAlert(false);
          router.replace("/login")
        }, 7000);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: "warning",
          text: res.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      });
  };

  return (
    <>
      {showAlert && (
        <DescriptionAlerts text={alertConfig.text} type={alertConfig.type} />
      )}
      <div className={styles.sign_form}>
        <div className={styles.sign_form_container}>
          <Form>
            <Form.Group className={styles.input_field}>
              <Form.Control
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.input_field}>
              <Form.Control
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className={styles.input_field}>
              <Form.Control
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.input_field}>
              <Form.Control
                type="password"
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.input_field_remember} onChange={checkboxHandler}>
              <Form.Check
                type="checkbox"
                label="I agree with Terms & conditions"
              />
            </Form.Group>
          </Form>
          <Button
            className={styles.sign_form_button}
            size="sm"
            onClick={handleSubmit}
            disabled={!email || !password || !name || !confirmPassword}
          >
            <h6>Create Account</h6>
          </Button>

          <div className={styles.sign_form_bottom}>
            <h5>Already have an Account.&nbsp;</h5>
            <h5>
              <Link href="/login/" className={styles.link}>
                Sign In
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
