import axios from 'axios';

const baseUri = 'https://ueapi.haeahn.com/api/BIMPerform';

const GetProjects = (employeeId, startDate, endDate) => {
    try{
        return axios.get(baseUri + '/projects', {
            params: {employeeId:employeeId, startDate:startDate, endDate:endDate}
        });
    }
    catch(error){
        console.error(error);
    }   
}

const GetElements = (employeeId, projectCode, startDate, endDate) => {
    try{
        return axios.get(baseUri + '/elements', {
            params: {employeeId:employeeId, projectCode:projectCode, startDate:startDate, endDate:endDate}
        });
    }
    catch(error){
        console.error(error);
    }   
}

const GetTransactionsPerDay = (startDate, endDate, projectCode, employeeId) => {
    try{
        return axios.get(baseUri + '/transactionCountPerDay', { 
        params: {employeeId: employeeId, projectCode: projectCode, startDate:startDate, endDate:endDate}
        });
    }
    catch(error){
        console.error(error);
    }
}

const LoginUser = (userId, pw, authKey) => {
    try{
      return axios.post('https://api.haeahn.com/api/loginsso', new URLSearchParams({userId, pw, authKey}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }
    catch(error){
      console.error(error);
    }
  }

export default {GetProjects, GetElements, GetTransactionsPerDay, LoginUser}