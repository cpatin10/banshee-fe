import React, { Component } from 'react';
import CustomerDataService from '../service/CustomerDataService';

class ListCustomersComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: []
        }
        this.refreshCustomers = this.refreshCustomers.bind(this)
        this.deleteCustomerClicked = this.deleteCustomerClicked.bind(this)
        this.updateCustomerClicked = this.updateCustomerClicked.bind(this)
        this.addCustomerClicked = this.addCustomerClicked.bind(this)
    }

    componentDidMount() {
        this.refreshCustomers();
    }

    refreshCustomers() {
        CustomerDataService.retrieveCustomers()
            .then(response => {
                    console.log(response);
                    this.setState({ customers: response.data })
                }
            )
    }

    deleteCustomerClicked(id) {
        CustomerDataService.deleteCustomer(id)
            .then(
                response => {
                    this.setState({ message: `Customer successfully deleted` })
                    this.refreshCustomers()
                }
            )
    
    }

    updateCustomerClicked(id) {
        this.props.history.push(`/customers/${id}`)
    }

    addCustomerClicked() {
        this.props.history.push(`/customers/-1`)
    }

    render() {
        return (
            <div>
                <h3>Customers</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nit</th>
                                <th>Full Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customer =>
                                        <tr key={customer.id}>
                                            <td>{customer.nit}</td>
                                            <td>{customer.fullName}</td>
                                            <td>
                                                <button className="btn btn-warning" 
                                                onClick={() => this.deleteCustomerClicked(customer.id)}>Delete</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success"
                                                onClick={() => this.updateCustomerClicked(customer.id)}>Details</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addCustomerClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListCustomersComponent