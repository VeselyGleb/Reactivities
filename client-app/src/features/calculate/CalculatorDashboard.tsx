import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import CalculatorList from './dashboard/CalculatorList';

export default observer(function CalculatorDashboard() {
    const { calculatorStore } = useStore();
    const { loadCalculate, calculatorRegistry } = calculatorStore;

    useEffect(() => {
        if (calculatorRegistry.size <= 1) loadCalculate();
    }, [loadCalculate, calculatorRegistry.size])

    if (calculatorStore.loadingInitial) return <LoadingComponent content='Loading app...' />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <CalculatorList />
            </Grid.Column>
        </Grid>
    )
})