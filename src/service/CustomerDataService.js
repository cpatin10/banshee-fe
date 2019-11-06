import axios from 'axios'

const INFO_CLIENTS_API_URL = 'http://localhost:8080/api'
const CUSTOMERS_API_URL = `${INFO_CLIENTS_API_URL}/customers`

class CustomerDataService {

    retrieveCustomers() {
        return axios.get(`${CUSTOMERS_API_URL}`);
    }

    deleteCustomer(customerId) {
        return axios.delete(`${CUSTOMERS_API_URL}/${customerId}`);
    }

    retrieveCustomer(id) {
        return axios.get(`${CUSTOMERS_API_URL}/${id}`);
    }
  
    createCustomer(customer) {
        return axios.post(`${CUSTOMERS_API_URL}`, customer);
    }

    updateCustomer(id, customer) {
        return axios.put(`${CUSTOMERS_API_URL}/${id}`, customer);
    }

}

export default new CustomerDataService()