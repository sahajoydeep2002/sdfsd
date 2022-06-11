import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function DietPlanPage() {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [physAct, setPhysAct] = useState(0);
    const [data, setData] = useState({});

    async function getDietData(e) {
        e.preventDefault();
        const res = await axios.get(
            `http://localhost:4000/api/features/diet-generator?weight=${weight}&height=${height}&age=${age}&gender=${gender}&phys_act=${physAct}`
        );
        setData(res.data);
        console.log(res.data);
    }

    function foodDesc(food) {
        if (food) {
            return food;
        } else {
            return "No recommendation";
        }
    }

    return (
        <Container className="mb-5">
            <Button className="mt-3 mb-3" variant="primary" href="/">
                ❮
            </Button>
            <h1 className="display-4" style={{ fontWeight: 800 }}>
                Diet Planner
            </h1>
            <h4 className="display-6" style={{ fontWeight: 800 }}>
                Information
            </h4>
            <div className="mb-5">
                <Form>
                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Label style={{ fontWeight: 900 }}>
                            Weight (kg)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Weight"
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="height">
                        <Form.Label style={{ fontWeight: 900 }}>
                            Height (cm)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Height"
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label style={{ fontWeight: 900 }}>Age</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label style={{ fontWeight: 900 }}>
                            Gender
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="physAct">
                        <Form.Label>
                            <span style={{ fontWeight: 900 }}>
                                Exercise Amount
                            </span>
                            <br />
                            <ul>
                                <li>1 = Little to no exercise</li>
                                <li>2 = Light exercise (1-3 days/week)</li>
                                <li>3 = Moderate exercise (3-5 days/week)</li>
                                <li>4 = Heavy exercise (6-7 days/week)</li>
                                <li>5 = Very heavy exercise (twice/day)</li>
                            </ul>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Exercise Amount"
                            onChange={(e) => setPhysAct(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => getDietData(e)}
                    >
                        Create Plan
                    </Button>
                </Form>
            </div>
            <h4 className="display-6" style={{ fontWeight: 800 }}>
                Plan
            </h4>
            <div>
                <h3 style={{ fontWeight: 800 }}>Breakfast</h3>
                <div className="flex-row d-flex justify-content-start">
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Fruit
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.breakfast?.fruit)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Grains
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.breakfast?.grains)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Protein
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.breakfast?.protein)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <br />
            <div>
                <h3 style={{ fontWeight: 800 }}>Snack 1</h3>
                <div className="flex-row d-flex justify-content-start">
                    <Card style={{ width: "14rem" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Snack
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.snack1?.snack)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <br />
            <div>
                <h3 style={{ fontWeight: 800 }}>Lunch</h3>
                <div className="flex-row d-flex justify-content-start">
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Fruit
                            </Card.Title>
                            <Card.Text>{foodDesc(data.lunch?.fruit)}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Grains
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.lunch?.grains)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Protein
                            </Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>{foodDesc(data.lunch?.protein)}</li>
                                    <li>{foodDesc(data.lunch?.protein2)}</li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Taste Enhancer
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.lunch?.taste_enhancer)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Vegetables
                            </Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>{foodDesc(data.lunch?.vegetable)}</li>
                                    <li>{foodDesc(data.lunch?.vegetable2)}</li>
                                    <li>{foodDesc(data.lunch?.vegetable3)}</li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <br />
            <div>
                <h3 style={{ fontWeight: 800 }}>Snack 2</h3>
                <div className="flex-row d-flex justify-content-start">
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Snack
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.snack2?.snack)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Vegetables
                            </Card.Title>
                            <Card.Text>
                                {foodDesc(data.snack2?.vegetable)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <br />
            <div>
                <h3 style={{ fontWeight: 800 }}>Dinner</h3>
                <div className="flex-row d-flex justify-content-start">
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Grains
                            </Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>{foodDesc(data.dinner?.grains)}</li>
                                    <li>{foodDesc(data.dinner?.grains2)}</li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Protein
                            </Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>{foodDesc(data.dinner?.protein)}</li>
                                    <li>{foodDesc(data.dinner?.protein2)}</li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }} className="me-4">
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Taste Enhancer
                            </Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>
                                        {foodDesc(data.dinner?.taste_enhancer)}
                                    </li>
                                    <li>
                                        {foodDesc(data.dinner?.taste_enhancer2)}
                                    </li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "14rem" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: 700 }}>
                                Vegetables
                            </Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>{foodDesc(data.dinner?.vegetable)}</li>
                                    <li>{foodDesc(data.dinner?.vegetable2)}</li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
}
