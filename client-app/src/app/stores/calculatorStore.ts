import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid';
import { Calculation } from '../../models/calculation';
import agent from '../api/agent';

export default class CalculatorStore {
    calculatorRegistry = new Map<string, Calculation>();
    selectedCalculator?: Calculation = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get groupedCalculate(): [string, Calculation[]][] {
        const sortedCalculate = Array.from(this.calculatorRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));

        return Object.entries(
            sortedCalculate.reduce((calculate, calculator) => {
                const date = calculator.date.split('T')[0];
                calculate[date] = calculate[date] ? [...calculate[date], calculator] : [calculator];
                return calculate;
            }, {} as {[key: string]: Calculation[]})
        )
    }

    get calculateByDate() {
        return Array.from(this.calculatorRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date))
    }

    loadCalculate = async () => {
        this.setLoadingInitial(true);
        try {
            const calculate = await agent.Calculations.list();
            calculate.forEach(calculator => {
                this.setCalculator(calculator);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadCalculator = async (id: string) => {
        let calculator = this.getCalculator(id);
        if (calculator) {
            this.selectedCalculator = calculator;
            return calculator;
        }
        else {
            this.setLoadingInitial(true);
            try {
                calculator = await agent.Calculations.details(id);
                this.setCalculator(calculator);
                runInAction(() => this.selectedCalculator = calculator);
                this.setLoadingInitial(false);
                return calculator;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setCalculator = (calculator: Calculation) => {
        calculator.date = calculator.date.split('T')[0];
        this.calculatorRegistry.set(calculator.id, calculator);
    }

    private getCalculator = (id: string) => {
        return this.calculatorRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCalculator = async (calculator: Calculation) => {
        this.loading = true;
        calculator.id = uuid();
        try {
            await agent.Calculations.create(calculator);
            runInAction(() => {
                this.calculatorRegistry.set(calculator.id, calculator);
                this.selectedCalculator = calculator;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
    // updateCalculator = async (calculator: Calculation) => {
    //     this.loading = true;
    //     try {
    //         await agent.Calculations.update(calculator)
    //         runInAction(() => {
    //             this.calculatorRegistry.set(calculator.id, calculator);
    //             this.selectedCalculator = calculator;
    //             this.editMode = false;
    //             this.loading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => this.loading = false);
    //     }
    // }
    // deleteCalculator = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.Calculations.delete(id);
    //         runInAction(() => {
    //             this.calculatorRegistry.delete(id);
    //             this.loading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => {
    //             this.loading = false;
    //         })
    //     }
    // }
}