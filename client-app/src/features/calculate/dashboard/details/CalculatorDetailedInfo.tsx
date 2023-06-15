import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Calculator } from '../../../../models/calculator';

interface Props {
    calculator: Calculator
}

export default observer(function CalculatorDetailedInfo({calculator}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='violet' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{calculator.type}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='violet'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {calculator.date}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='violet'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{calculator.pressure}, {calculator.diameter}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})