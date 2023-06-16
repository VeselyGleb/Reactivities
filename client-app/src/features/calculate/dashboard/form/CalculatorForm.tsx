import { observer } from 'mobx-react-lite';
import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment, Input, TextArea, Select } from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import LoadingComponent from '../../../../app/layout/LoadingComponent';
import { useStore } from '../../../../app/stores/store';

export default observer(function CalculatorForm() {
    const {calculationStore} = useStore();
    const {createCalculator,
        loading, loadCalculator, loadingInitial} = calculationStore;
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
        console.log("Attempt creation calculation");
        calculator.id = uuid();
        createCalculator(calculator).then(() => console.log("created"))
        //() => navigate(`/calculate/${calculator.id}`)
    }
}

if (loadingInitial) return <LoadingComponent content='Loading calculator...' />

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setCalculator({...calculator, [name]: value})
}
/* 
const envTypeOptions = [
    { key: 'gas', text: 'Газ', value: 'gas' },
    { key: 'liq', text: 'Жидкость', value: 'liquid' },
  ]
  
  const groupOptions = [
    { key: '1', text: '1-я', value: 'first' },
    { key: '2', text: '2-я', value: 'second' },
  ] */
  

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group widths='equal'>
                    <Form.Input placeholder='Среда' value={calculator.type}  name='type' onChange={handleInputChange}/>
                    {/* <Form.Field control={Select} options={envTypeOptions} placeholder='Среда' value={calculator.type}  name='environment' onChange={handleInputChange} /> */}
                    <Form.Input placeholder='Группа' value={calculator.group} name='group' onChange={handleInputChange} />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input  placeholder='Диаметр' value={calculator.diameter} name='diameter' onChange={handleInputChange} />
                    <Form.Input placeholder='Давление' value={calculator.pressure} name='pressure' onChange={handleInputChange} />
                </Form.Group>
                
                
        
                
                <Button loading={loading} floated='right' positive type='submit' content='Вычислить' />
                <Button as={Link} to='/calculations' floated='right' type='button' content='Назад' />
        </Form>
      </Segment>
    )
})