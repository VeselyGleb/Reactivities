import { RouteObject, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityDetails from "../../features/activities/dashboard/details/ActivityDetails";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";
import CalculatorDashboard from "../../features/calculate/CalculatorDashboard";
import CalculatorForm from "../../features/calculate/dashboard/form/CalculatorForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'calculations', element: <CalculatorDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},

            {path: 'createActivity', element: <ActivityForm key='create' />},
            {path: 'createCalculation', element: <CalculatorForm key='create' />},
            
            {path: 'manage/:id', element: <ActivityForm key='manage' />},
        ]
    }
]

export const router = createBrowserRouter(routes);