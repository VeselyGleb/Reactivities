import { observer } from "mobx-react-lite";
import { Fragment } from 'react';
import { Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import CalculatorListItem from './CalculatorListItem';

export default observer(function CalculatorList() {
    const { calculationStore } = useStore();
    const { groupedCalculate } = calculationStore;

return (
        <>
            {groupedCalculate.map(([group, calculate]) => (
                <Fragment key={group}>
                    <Header sub color='violet'>
                        {group}
                    </Header>
                    {calculate && calculate.map(calculator => (
                        <CalculatorListItem key={calculator.id} calculator={calculator} />
                    ))}
                </Fragment>
            ))}
        </>

    )
})