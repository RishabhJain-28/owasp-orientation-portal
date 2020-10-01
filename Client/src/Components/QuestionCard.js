import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./question.css";

const Question = ({
  num,
  question: { _id, statement, options },
  markAns,
  currentAns,
}) => {
  // function optionSelected(e) {
  //   console.log(e.target.value);
  // }
  useEffect(() => {
    if (currentAns) setCurrent(currentAns);
  }, [currentAns]);

  const [current, setCurrent] = useState("");
  return (
    <div>
      <h6 className="mt-2 mb-2">
        <span className="auto_submit_span">Q{num}.</span>{" "}
        <p style={{ whiteSpace: "pre-line" }}>{statement}</p>
      </h6>
      <Form id={_id}>
        <Form.Group>
          {/* <Form.Control as="select"> */}
          {options &&
            options.map((option) => {
              // option.checked === false;
              return (
                <Form.Check
                  checked={option === current}
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
                    setCurrent(e.target.value);
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
