import { Link } from "react-router-dom";
import { Item, Button, Icon, Segment } from "semantic-ui-react";
import { Calculator } from "../../../models/calculator";

interface Props {
    calculator: Calculator
}

export default function CalculatorListItem({ calculator }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{calculator.title}</Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {calculator.date}
                    <Icon name='marker' /> {calculator.pressure}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{calculator.type}</span>
                <Button
                    as={Link}
                    to={`/activities/${calculator.id}`}
                    color='violet'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}