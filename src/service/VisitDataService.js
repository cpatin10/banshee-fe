import axios from 'axios'

const VISITS_API_URL = 'http://localhost:8080/api/visits'

class VisitDataService {

    deleteVisit(visitId) {
        return axios.delete(`${VISITS_API_URL}/${visitId}`);
    }
  
    createVisit(visit) {
        return axios.post(`${VISITS_API_URL}`, visit);
    }

    updateVisit(visitId, visit) {
        return axios.put(`${VISITS_API_URL}/${visitId}`, visit);
    }

}

export default new VisitDataService()