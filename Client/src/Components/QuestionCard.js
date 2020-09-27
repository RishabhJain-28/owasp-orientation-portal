import React from 'react';
import { Form } from 'react-bootstrap';
import './question.css';

const Question = () => {
    return ( 
        <div className="question">
            <h6 className="mt-2 mb-2">Q1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</h6>
            <Form>
                <Form.Check type="radio" label="Option 1" />
                <Form.Check type="radio" label="Option 1" />
                <Form.Check type="radio" label="Option 1" />
                <Form.Check type="radio" label="Option 1" />
            </Form>
        </div>
     );
}
 
export default Question;