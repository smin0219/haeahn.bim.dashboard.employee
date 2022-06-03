import axios from 'axios';

const baseUri = 'https://ueapi.haeahn.com/api/UnrealViewer';

const GetElements = (employeeId, startDate, endDate) => {
    try{
        return axios.get(baseUri + '/elements', {
            params: {employeeId:employeeId, startDate:startDate, endDate:endDate}
        });
    }
    catch(error){
        console.error(error);
    }   
}

export default {GetElements}