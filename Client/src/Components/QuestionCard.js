import React from "react";
import { Form } from "react-bootstrap";
import "./question.css";

const Question = ({ num, question: { _id, statement, options }, markAns }) => {
  // function optionSelected(e) {
  //   console.log(e.target.value);
  // }

  return (
    <div>
      <h6 className="mt-2 mb-2">
        <span className="auto_submit_span">Q{num}.</span> {statement}
      </h6>
      <Form>
        <Form.Group id={_id}>
          {/* <Form.Control as="select"> */}
          {options &&
            options.map((option) => {
              // option.checked === false;
              return (
                <Form.Check
                  // checked={true}
                  type="radio"
                  key={option}
                  label={option}
                  id={option}
                  name="options"
                  value={option}
                  q_id={_id}
                  onChange={(e) => {
                    // console.log(e.target.checked);
                    // e.target.checked = true;
                    markAns(e, _id);
                  }}
                /> //! fix radioo buutons
              );
            })}
          {/* <Form.Check type="radio" label="Option 2" />
        <Form.Check type="radio" label="Option 3" />
    <Form.Check type="radio" label="Option 4" /> */}
          {/* </Form.Control> */}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Question;
