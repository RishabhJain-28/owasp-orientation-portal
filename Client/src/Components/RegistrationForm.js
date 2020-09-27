import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Input from "./common/Input";

const RegistrationForm = ({ buttonText, ...rest }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  //! validators
  return (
    <Form
      {...rest}
      // action={`${process.env.REACT_APP_BASE_URL}/api/auth/register`}
      action={`http://localhost:5000/api/auth/register`}
      method="POST"
    >
      <Input
        type="text"
        placeholder="Enter your name"
        label="NAME:"
        value={name}
        name="name"
        required
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Enter username"
        label="USERNAME:"
        value={username}
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Enter phone number"
        label="PHONE NUMBER:"
        value={phoneNumber}
        name="phoneNumber"
        required
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Enter branch"
        label="BRANCH:"
        value={branch}
        name="branch"
        required
        onChange={(e) => setBranch(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Enter roll number"
        label="ROLL NUMBER:"
        value={rollNumber}
        name="rollNumber"
        required
        onChange={(e) => setRollNumber(e.target.value)}
      />
      {/* <div className="centered form-group"> */}
      {/* <div class="row">
        <div class="col-md-4 col-lg-2">
          <button class="btn btn-primary  btn-block">
            G Sign-up with Google
          </button>
        </div>
      </div> */}
      <div className="submit-button">
        <button type="submit" className="btn submit-google-btn btn-block">
          <span className="g-sign">{buttonText}</span>
        </button>
      </div>
      {/* </div> */}
    </Form>
  );
};
export default RegistrationForm;
