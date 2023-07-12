import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./Forgot.module.scss";
const ChangePassword = ({ formData, setFormData }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <Form>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="text"
              placeholder={formData.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="number"
              placeholder={formData.otp}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="password"
              placeholder=" Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
