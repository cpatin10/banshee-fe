import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomerDataService from '../service/CustomerDataService';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    nit: yup
      .string()
      .required('Please enter the customer nit')
      .label('Nit'),
    fullName: yup
      .string()
      .required('Please enter the customer full name')
      .label('Full Name'),
  });

const PREVIOUS_PATH = '/customers'

class CustomerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            nit: '',
            fullName: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return
        }
        CustomerDataService.retrieveCustomer(this.state.id)
            .then(response => {
                console.log(response)
                this.setState({ 
                    nit: response.data.nit, 
                    fullName: response.data.fullName 
                })
            }
        )
    }

    exitClicked() {
        this.props.history.push(`/customers`)
    }

    onSubmit(values) {
        let customer = {
            nit: values.nit,
            fullName: values.fullName,
            address: 'cra a 7 sur',
            phone: '1234567890',
            creditLimit: 200000,
            availableCredit: 100000,
            visitPercentage: 0.1,
            location: {
                city: 'Medellín',
                state: 'Antioquia',
                country: 'Colombia',
            }
        }

        if (this.state.id == -1) {
            console.log(`Customer creation`);
            CustomerDataService.createCustomer(customer)
                .then(() => this.props.history.push(PREVIOUS_PATH))
        } else {
            console.log(`Customer update`);
            CustomerDataService.updateCustomer(this.state.id, customer)
                .then(() => this.props.history.push(PREVIOUS_PATH))
        }
    }    

    render() {
        let { nit, fullName } = this.state  

        return (
            <div>
                <h3>Customer Details</h3>
                <div className="container">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{ nit, fullName }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={validationSchema}
                        onSubmit={this.onSubmit}>
                        {
                            ({ errors, touched }) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Nit</label>
                                        <Field name="nit" className="form-control" type="text"/>
                                            {errors.nit && touched.nit ? (
                                                <div>{errors.nit}</div>
                                            ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Full Name</label>
                                        <Field name="fullName" className="form-control" type="text"/>
                                            {errors.fullName && touched.fullName ? (
                                                <div>{errors.fullName}</div>
                                            ) : null}
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
    
                </div>
                <br/>
                <button className = "btn btn-success" onClick = {() => this.exitClicked()}>Exit</button>
            </div>
        )
    }

}

export default CustomerComponent