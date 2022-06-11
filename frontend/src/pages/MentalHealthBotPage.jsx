import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function MentalHealthBotPage() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await axios
            .get(`/api/features/chatbot?message=${message}`)
            .catch((err) => console.log(err.message));

        console.log(res?.data);

        if (res?.data.message) {
            setResponse(res.data.message);
        }
    }

    return (
        <Container className='mb-5'>
            <Button className='mt-3 mb-3' variant='primary' href='/'>
                ❮
            </Button>
            <h1 className='display-4' style={{ fontWeight: 800 }}>
                Mental Health Bot
            </h1>
            <Form className='mb-5'>
                <Form.Group className='mb-3' controlId='message'>
                    <Form.Label style={{ fontWeight: 900 }}>
                        Enter how you are feeling or enter a mental health
                        condition
                    </Form.Label>
                    <Form.Control
                        placeholder='Type your message here'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant='primary'
                    type='submit'
                    className='mb-3'
                    onClick={(e) => handleSubmit(e)}
                >
                    Send
                </Button>

                <div>
                    <b>Response</b>: {response}
                </div>
            </Form>

            <div>
                <h3>Main features</h3>
                <ol>
                    <li>
                        Give you a list mental health conditions you can ask
                        about (ex. What mental health conditions can I ask
                        about?)
                    </li>
                    <li>Give information about a mental health condition (ex. What is bipolar?, What is autism?)</li>
                    <li>
                        Encourage you if you are not feeling happy (ex. I feel
                        sad, I feel mad, I am depressed)
                    </li>
                </ol>
            </div>
        </Container>
    );
}
