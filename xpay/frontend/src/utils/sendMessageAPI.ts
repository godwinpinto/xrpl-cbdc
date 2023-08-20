import axios from 'axios';


export const sendMessageAPI = async (data: any, channel: string, event: string) => {
    const payload = {
        data: JSON.stringify(data),
        channel: channel,
        event: event
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const url = '/api/send_message';
    axios.post(url, payload, { headers })
        .then((response: any) => {
        })
        .catch((error: any) => {
            console.error('Error sending event:', error);
        });
}