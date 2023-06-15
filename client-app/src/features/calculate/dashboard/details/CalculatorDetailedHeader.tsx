import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Calculator } from '../../../../models/calculator';

const calculatorImageStyle = {
    filter: 'brightness(30%)'
};

const calculatorImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    calculator: Calculator
}

export default observer (function CalculatorDetailedHeader({calculator}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Segment style={calculatorImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={calculator.title}
                                    style={{color: 'white'}}
                                />
                                <p>{calculator.date}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='pink' floated='right'>
                    Рассчитать
                </Button>
            </Segment>
        </Segment.Group>
    )
})