import axios from 'axios';

const SERVER_URL=import.meta.env.VITE_RIPPLE_ECHO_URL;

const headersVal={headers:{"Content-Type":"application/json"}}

export const fetchData = async (email_address:string):Promise<boolean> => {
    try {
        const response = await axios.post(SERVER_URL+"/notification/validate-login",{origin_id:email_address},headersVal);
        console.log("responseresponseresponseresponse",response)
        if(response.status==200){
            return response.data.response.data.status
        }else{
            return false
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return false
    }
}

export const registerUser = async (input:any):Promise<boolean> => {
    console.log("input",input)
    try {
        const response = await axios.post(SERVER_URL+"/notification/register",input,headersVal);
        console.log("responseresponse",response)
        if(response.data.response.status==200){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return false
    }
}
export const fetchTransactions = async (origin_id:any):Promise<any> => {
    try {
        const response = await axios.post(SERVER_URL+"/notification/dashboard",{origin_id:origin_id},headersVal);
        console.log("responseresponse",response)
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}