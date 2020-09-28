import React from "react";
import { Form } from "react-bootstrap";
import "./question.css";

const Question = ({ question: { questionStatement, options } }) => {
  function optionSelected(e) {
    console.log(e.target.value);
  }
  return (
    <div>
      <h6 className="mt-2 mb-2">{questionStatement}</h6>
      <Form>
        <Form.Group>
          {options &&
            options.map((option) => (
              <Form.Check
                type="radio"
                key={option}
                label={option}
                id={option}
                name="options"
                value={option}
                onChange={(e) => optionSelected(e)}
              /> //! fix radioo buutons
            ))}
          {/* <Form.Check type="radio" label="Option 2" />
        <Form.Check type="radio" label="Option 3" />
    <Form.Check type="radio" label="Option 4" /> */}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Question;
