import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Input from "./common/Input";

const RegistrationForm = ({ buttonText, ...rest }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  return (
    <Form
      {...rest}
      action={`${process.env.REACT_APP_BASE_URL}/api/auth/register`}
      // action={`http://localhost:5000/api/auth/register`}
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
        placeholder="Enter year"
        label="YEAR:"
        value={year}
        name="year"
        required
        list="years"
        onChange={(e) => setYear(e.target.value)}
      />
      <datalist id="years">
        <option value="First year" />
        {/* <option value="Second year" /> */}
      </datalist>
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
        list="branches"
        id="branch"
        onChange={(e) => setBranch(e.target.value)}
      />
      <datalist id="branches">
        <option value="CHEMICAL ENGINEERING – CHE" />
        <option value="CIVIL ENGINEERING - CIE" />
        <option value="COMPUTER ENGINEERING - COE" />
        <option value="COMPUTER SCIENCE AND ENGINEERING(PATIALA CAMPUS) – COPC" />
        <option value="ELECTRICAL ENGINEERING - ELE" />
        <option value="ELECTRONICS AND COMMUNICATION ENGINEERING - ECE" />
        <option value="ELECTRONICS AND COMPUTER ENGINEERING - ENC" />
        <option value="ELECTRONICS (INSTRUMENTATION AND CONTROL) ENGINEERING - EIC" />
        <option value="MECHANICAL ENGINEERING – MEE" />
        <option value="MECHANICAL ENGINEERING(PRODUCTION) - MPE" />
        <option value="MECHATRONICS - MEC" />
        <option value="ELECTRICAL AND COMPUTER ENGINEERING" />
        <option value="COMPUTER SCIENCE AND BUSINESS SYSTEMS - COBS" />
        <option value="BIOTECH" />
      </datalist>
      <Input
        type="number"
        placeholder="Enter Application number"
        label="APPLICATION NUMBER:"
        value={rollNumber}
        name="rollNumber"
        required
        onChange={(e) => setRollNumber(e.target.value)}
      />

      <div className="submit-button">
        <button type="submit" className="btn submit-google-btn btn-block">
          <span className="g-sign">{buttonText}</span>
        </button>
      </div>
    </Form>
  );
};
export default RegistrationForm;
