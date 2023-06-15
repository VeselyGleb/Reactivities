import { Grid } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CalculatorDetailedHeader from "./CalculatorDetailedHeader";
import CalculatorDetailedInfo from "./CalculatorDetailedInfo";
import CalculatorDetailedSidebar from "./CalculatorDetailedSidebar";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { useStore } from "../../../../app/stores/store";

export default observer(function CalculatorDetails() {
  const { calculatorStore } = useStore();
  const { selectedCalculator: calculator, loadCalculator, loadingInitial } = calculatorStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadCalculator(id);
}, [id, loadCalculator]);

if (loadingInitial || !calculator) return <LoadingComponent />
  
    return (
      <Grid>
      <Grid.Column width='10'>
          <CalculatorDetailedHeader calculator={calculator} />
          <CalculatorDetailedInfo calculator={calculator} />
      </Grid.Column>
      <Grid.Column width='6'>
          <CalculatorDetailedSidebar />
      </Grid.Column>
  </Grid>
    )
})