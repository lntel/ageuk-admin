import { toast } from "react-toastify";

const apiUrl = "http://localhost:5000";

export interface RequestData {
    url: string;
    data?: object;
}

const get = async (requestData: RequestData) => {
    const request = await fetch(`${apiUrl}${requestData.url}`);

    return request;
}

const post = async (requestData: RequestData) => {
    const request = await fetch(`${apiUrl}${requestData.url}`, {
        method: 'POST',
        body: JSON.stringify(requestData.data),
        headers: {
            'content-type': 'application/json'
        }
    });

    if(request.status === 429) {
        toast.error("You are making too many requests, please wait and try again");
    }

    return request;
}

export {
    get,
    post
}