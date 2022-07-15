import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup"
import Input from "./components/Input";
import Button from "./components/Button"
import Container from "./components/Container"
import Section from "./components/Section"
import Balance from "./components/Balance"

const App = () => {
    const  [balance, setBalance] = useState('')
    const compoundInterest = (deposit, contribution, years, rate) => {
        let total = deposit
        
        for(let i=0; i<years; i++) {
            total = (total+contribution) * (rate+1);
        }

        return Math.round(total)
    }

    const formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const handleSubmit = ({deposit, contribution, years, rate}) => {
        let val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
        setBalance(formatter.format(val))
    };
    return (
        <Container>
            <Section>
                <Formik
                    initialValues={{
                        deposit: "",
                        contribution: "",
                        years: "",
                        rate: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        deposit: 
                            Yup.number()
                            .required('This Field is Required')
                            .typeError("It must be a number."),
                        contribution: 
                            Yup.number()
                            .required('This Field is Required')
                            .typeError("It must be a number."),
                        years: 
                            Yup.number()
                            .required('This Field is Required')
                            .typeError("It must be a number."),
                        rate: 
                            Yup.number()
                            .required('This Field is Required')
                            .typeError("It must be a number.")
                            .min(0, 'The min value is 0.01').
                            max(1, 'The max value is 1'),
                    }
                    )}
                >
                    <Form>
                        <Input name="deposit" label="Depósito Inicial" />
                        <Input
                            name="contribution"
                            label="Annual Contribution"
                        />
                        <Input name="years" label="Years" />
                        <Input name="rate" label="Estimated Rate" />
                        <Button>Calcular</Button>
                    </Form>
                </Formik>
                {balance !== '' ? <Balance>Total: {balance}</Balance> : null}
            </Section>
        </Container>
    );
};

export default App;
