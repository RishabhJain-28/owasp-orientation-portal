import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ label, name, id, placeholder, type, ...rest }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label className="label">{label} </Form.Label>
      <Form.Control
        name={name}
        {...rest}
        type={type}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default Input;
