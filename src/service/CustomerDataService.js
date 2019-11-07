import axios from 'axios'

const CUSTOMERS_API_URL = 'http://localhost:8080/api/customers'

class CustomerDataService {

    retrieveCustomers() {
        return axios.get(`${CUSTOMERS_API_URL}`);
    }

    deleteCustomer(customerId) {
        return axios.delete(`${CUSTOMERS_API_URL}/${customerId}`);
    }

    retrieveCustomer(customerId) {
        return axios.get(`${CUSTOMERS_API_URL}/${customerId}`);
    }
  
    createCustomer(customer) {
        return axios.post(`${CUSTOMERS_API_URL}`, customer);
    }

    updateCustomer(customerId, customer) {
        return axios.put(`${CUSTOMERS_API_URL}/${customerId}`, customer);
    }

}

export default new CustomerDataService()