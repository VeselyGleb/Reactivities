import { createContext, useContext } from "react"
import activityStore from "./activityStore";
import CalculatorStore from "./calculatorStore";

interface Store {
    activityStore: activityStore,
    calculationStore: CalculatorStore
}

export const store: Store = {
    activityStore: new activityStore(),
    calculationStore: new CalculatorStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}