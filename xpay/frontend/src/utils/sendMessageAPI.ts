import axios from 'axios';


export const sendMessageAPI = async (message_text: string,mobile_number:string):Promise<string> => {
    const payload = {
        message_text: message_text,
        mobile_number:mobile_number
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const url = '/api/send_message';
    try {
        const response = await axios.post(url, payload, { headers });
        return response.data.message; 
    } catch (error) {
        console.error('Error sending event:', error);
        throw error;
    }
}