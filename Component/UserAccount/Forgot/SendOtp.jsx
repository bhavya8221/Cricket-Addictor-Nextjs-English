import React from "react";
import { useEffect } from "react";
// import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./Forgot.module.scss";
const SendOtp = ({ formData, setFormData }) => {
  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <Form>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="text"
              placeholder="Username or Email"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="number"
              placeholder="OTP"

              disabled
            />
          </Form.Group>

          <Form.Group className={styles.input_field}>
            <Form.Control
              type="password"
              placeholder="New Password"
              disabled
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Control
              type="password"
              placeholder=" Confirm New Password"

              disabled
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SendOtp;
