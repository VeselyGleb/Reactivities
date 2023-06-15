import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import LoadingComponent from '../../../../app/layout/LoadingComponent';
import { useStore } from '../../../../app/stores/store';

export default observer(function CalculatorForm() {
    const {calculatorStore} = useStore();
    const {createCalculator, updateCalculator, 
        loading, loadCalculator, loadingInitial} = calculatorStore;
    const {id} = useParams();
    const navigate = useNavigate();

const [calculator, setCalculator] = useState({
    id: '',
    title: '',
    group: '',
    type: '',
    date: '',
    diameter: '',
    pressure: ''
});

useEffect(() => {
    if (id) loadCalculator(id).then(calculator => setCalculator(calculator!));
}, [id, loadCalculator]);

function handleSubmit() { 
    if (!calculator.id) {
        calculator.id = uuid();
        createCalculator(calculator).then(() => navigate(`/calculate/${calculator.id}`))
    } else {
        updateCalculator(calculator).then(() => navigate(`/calculate/${calculator.id}`))
    }
}

if (loadingInitial) return <LoadingComponent content='Loading calculator...' />

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setCalculator({...calculator, [name]: value})
}

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={calculator.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Descriftion' value={calculator.type} name='type' onChange={handleInputChange} />
                <Form.Input placeholder='Group' value={calculator.group} name='group' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={calculator.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Diameter' value={calculator.diameter} name='diameter' onChange={handleInputChange} />
                <Form.Input placeholder='Pressure' value={calculator.pressure} name='pressure' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/calculate' floated='right' type='button' content='Cancel' />
        </Form>
      </Segment>
    )
})