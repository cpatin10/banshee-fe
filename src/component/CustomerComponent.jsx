import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomerDataService from '../service/CustomerDataService';
import * as yup from 'yup';
import VisitDataService from '../service/VisitDataService';

const customerValidationSchema = yup.object().shape({
    nit: yup
        .string()
        .matches(/^\d+$/, "Nit must be conformed of digits only")
        .max(12, "Nit must not have more than 15 digits")
        .required('Please enter the nit')
        .label('Nit'),
    fullName: yup
        .string()
        .required('Please enter the full name')
        .label('Full Name'),
    address: yup
        .string()
        .required('Please enter the address')
        .label('Address'),
    country: yup
        .string()
        .required('Please enter the country')
        .label('Country'),
    state: yup
        .string()
        .required('Please enter the state')
        .label('State'),
    city: yup
        .string()
        .required('Please enter the city')
        .label('City'),
    phone: yup
        .string()
        .matches(/^\d+$/, "Nit must be conformed of digits only")
        .min(7, "Phone Number must have at least 7 digits")
        .max(12, "Phone Number must not have more than 12 digits")
        .required('Please enter the phone number')
        .label('Phone Number'),
    creditLimit: yup
        .number()
        .min(0, "Credit limit must be equals or greater than 0")
        .required('Please enter the credit limit')
        .label('Credit Limit'),
    availableCredit: yup
        .number()
        .min(0, "Available credit must be equals or greater than 0")
        .required('Please enter the full name')
        .label('Available Credit'),
    visitPercentage: yup
        .number()
        .min(0, "Visit percentage must be equals or greater than 0")
        .required('Please enter the full name')
        .label('Visit Percentage'),
});

const visitValidationSchema = yup.object().shape({
    date: yup
        .date()
        .required('Please enter the date')
        .label('Nit'),
    net: yup
        .number()
        .min(0, "Visit percentage must be equals or greater than 0")
        .required('Please enter the net')
        .label('Net'),
    description: yup
        .string()
        .required('Please enter the description')
        .label('Country'),
    salesRepresentativeIdentification: yup
        .string()
        .required('Please enter identification number')
        .label('State')
});

class CustomerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            nit: '',
            fullName: '',
            address: '',
            phone: '',
            creditLimit: '',
            availableCredit: '',
            visitPercentage: '',
            country: '',
            state: '',
            city: '',
            visits: []
        }
        this.onCustomerSubmit = this.onCustomerSubmit.bind(this)
        this.loadCustomer = this.loadCustomer.bind(this)
        this.onVisitSubmit = this.onVisitSubmit.bind(this)
        this.deleteVisitClicked = this.deleteVisitClicked.bind(this)
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return
        }
        this.loadCustomer()
    }

    loadCustomer() {
        CustomerDataService.retrieveCustomer(this.state.id)
            .then(response => {
                console.log(response)
                this.setState({
                    nit: response.data.nit,
                    fullName: response.data.fullName,
                    address: response.data.address,
                    country: response.data.location.country,
                    state: response.data.location.state,
                    city: response.data.location.city,
                    phone: response.data.phone,
                    creditLimit: response.data.creditLimit,
                    availableCredit: response.data.availableCredit,
                    visitPercentage: response.data.visitPercentage,
                    visits: response.data.visits
                })
            })
    }

    exitClicked() {
        this.props.history.push(`/customers`)
    }

    onCustomerSubmit(values) {
        let customer = {
            nit: values.nit,
            fullName: values.fullName,
            address: values.address,
            phone: values.phone,
            creditLimit: values.creditLimit,
            availableCredit: values.availableCredit,
            visitPercentage: values.visitPercentage,
            location: {
                city: values.city,
                state: values.state,
                country: values.country
            }
        }

        if (this.state.id == -1) {
            CustomerDataService.createCustomer(customer)
                .then(response => this.loadCustomer())
        } else {
            CustomerDataService.updateCustomer(this.state.id, customer)
                .then(response => this.loadCustomer())
        }
    }

    onVisitSubmit(values) {
        let visit = {
            customerId: this.state.id,
            date: values.date,
            net: values.net,
            description: values.description,
            salesRepresentativeIdNumber: values.salesRepresentativeIdentification,
        }
        if (values.id == -1) {
            VisitDataService.createVisit(visit)
                .then(response => this.loadCustomer())
        } else {
            VisitDataService.updateVisit(values.id, visit)
                .then(response => this.loadCustomer())
        }
    }

    deleteVisitClicked(visitId) {
        VisitDataService.deleteVisit(visitId)
            .then(response => this.loadCustomer())
    }

    render() {
        let { nit,
            fullName,
            address,
            country,
            state,
            city,
            phone,
            creditLimit,
            availableCredit,
            visitPercentage } = this.state

        return (
            <div>
                <h3>Customer Details</h3>
                <div className="container">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            nit,
                            fullName,
                            address,
                            country,
                            state,
                            city,
                            phone,
                            creditLimit,
                            availableCredit,
                            visitPercentage
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={customerValidationSchema}
                        onSubmit={this.onCustomerSubmit}>
                        {
                            ({ errors, touched }) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Nit</label>
                                        <Field name="nit" className="form-control" type="text" />
                                        {errors.nit && touched.nit ? (
                                            <div>{errors.nit}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Full Name</label>
                                        <Field name="fullName" className="form-control" type="text" />
                                        {errors.fullName && touched.fullName ? (
                                            <div>{errors.fullName}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Address</label>
                                        <Field name="address" className="form-control" type="text" />
                                        {errors.address && touched.address ? (
                                            <div>{errors.address}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Country</label>
                                        <Field name="country" className="form-control" type="text" />
                                        {errors.country && touched.country ? (
                                            <div>{errors.country}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>State</label>
                                        <Field name="state" className="form-control" type="text" />
                                        {errors.state && touched.state ? (
                                            <div>{errors.state}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>City</label>
                                        <Field name="city" className="form-control" type="text" />
                                        {errors.city && touched.city ? (
                                            <div>{errors.city}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Phone Number</label>
                                        <Field name="phone" className="form-control" type="text" />
                                        {errors.phone && touched.phone ? (
                                            <div>{errors.phone}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Credit Limit</label>
                                        <Field name="creditLimit" className="form-control" type="text" />
                                        {errors.creditLimit && touched.creditLimit ? (
                                            <div>{errors.creditLimit}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Available Credit</label>
                                        <Field name="availableCredit" className="form-control" type="text" />
                                        {errors.availableCredit && touched.availableCredit ? (
                                            <div>{errors.availableCredit}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Visit Percentage</label>
                                        <Field name="visitPercentage" className="form-control" type="text" />
                                        {errors.visitPercentage && touched.visitPercentage ? (
                                            <div>{errors.visitPercentage}</div>
                                        ) : null}
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <br />
                <br />
                <br />
                <div className="container">
                    <h5>Visits</h5>
                    {
                        this.state.visits.map(
                            visit =>
                                <div key={visit.id}>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={{
                                            id: visit.id,
                                            date: visit.date,
                                            net: visit.net,
                                            visitTotal: visit.visitTotal,
                                            description: visit.description,
                                            salesRepresentativeName: visit.salesRepresentative.fullName,
                                            salesRepresentativeIdentification: visit.salesRepresentative.identificationNumber,
                                        }}
                                        validateOnChange={false}
                                        validateOnBlur={false}
                                        validationSchema={visitValidationSchema}
                                        onSubmit={this.onVisitSubmit}>
                                        {
                                            ({ errors, touched }) => (
                                                <Form>
                                                    <br />
                                                    <br />
                                                    <fieldset className="form-group">
                                                        <label>Date</label>
                                                        <Field name="date" className="form-control" type="text" />
                                                        {errors.date && touched.date ? (
                                                            <div>{errors.date}</div>
                                                        ) : null}
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Net</label>
                                                        <Field name="net" className="form-control" type="text" />
                                                        {errors.net && touched.net ? (
                                                            <div>{errors.net}</div>
                                                        ) : null}
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Visit Total</label>
                                                        <Field name="visitTotal" className="form-control" type="text" disabled />
                                                        {errors.visitTotal && touched.visitTotal ? (
                                                            <div>{errors.visitTotal}</div>
                                                        ) : null}
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Description</label>
                                                        <Field name="description" className="form-control" type="text" />
                                                        {errors.description && touched.description ? (
                                                            <div>{errors.description}</div>
                                                        ) : null}
                                                    </fieldset>
                                                    <h6>Sales Representative</h6>
                                                    <fieldset className="form-group">
                                                        <label>Identification Number</label>
                                                        <Field name="salesRepresentativeIdentification" className="form-control" type="text" />
                                                        {errors.salesRepresentativeIdentification && touched.salesRepresentativeIdentification ? (
                                                            <div>{errors.salesRepresentativeIdentification}</div>
                                                        ) : null}
                                                    </fieldset>
                                                    <fieldset className="form-group">
                                                        <label>Full Name</label>
                                                        <Field name="salesRepresentativeName" className="form-control" type="text" disabled />
                                                        {errors.salesRepresentativeName && touched.salesRepresentativeName ? (
                                                            <div>{errors.salesRepresentativeName}</div>
                                                        ) : null}
                                                    </fieldset>
                                                    <button className="btn btn-success" type="submit">Save</button>
                                                </Form>
                                            )}
                                    </Formik>
                                    <br />
                                    <button className="btn btn-success" onClick={() => this.deleteVisitClicked(visit.id)}>Delete</button>
                                </div>
                        )
                    }
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id: -1,
                            date: '',
                            net: '',
                            visitTotal: '',
                            description: '',
                            salesRepresentativeName: '',
                            salesRepresentativeIdentification: '',
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={visitValidationSchema}
                        onSubmit={this.onVisitSubmit}>
                        {
                            ({ errors, touched }) => (
                                <Form>
                                    <br />
                                    <br />
                                    <fieldset className="form-group">
                                        <label>Date</label>
                                        <Field name="date" className="form-control" type="text" />
                                        {errors.date && touched.date ? (
                                            <div>{errors.date}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Net</label>
                                        <Field name="net" className="form-control" type="text" />
                                        {errors.net && touched.net ? (
                                            <div>{errors.net}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Visit Total</label>
                                        <Field name="visitTotal" className="form-control" type="text" disabled />
                                        {errors.visitTotal && touched.visitTotal ? (
                                            <div>{errors.visitTotal}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field name="description" className="form-control" type="text" />
                                        {errors.description && touched.description ? (
                                            <div>{errors.description}</div>
                                        ) : null}
                                    </fieldset>
                                    <h6>Sales Representative</h6>
                                    <fieldset className="form-group">
                                        <label>Identification Number</label>
                                        <Field name="salesRepresentativeIdentification" className="form-control" type="text" />
                                        {errors.salesRepresentativeIdentification && touched.salesRepresentativeIdentification ? (
                                            <div>{errors.salesRepresentativeIdentification}</div>
                                        ) : null}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Full Name</label>
                                        <Field name="salesRepresentativeName" className="form-control" type="text" disabled />
                                        {errors.salesRepresentativeName && touched.salesRepresentativeName ? (
                                            <div>{errors.salesRepresentativeName}</div>
                                        ) : null}
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Add</button>
                                </Form>
                            )}
                    </Formik>
                </div>
                <br />
                <br />
                <button className="btn btn-success" onClick={() => this.exitClicked()}>Exit</button>
            </div>
        )
    }
}

export default CustomerComponent