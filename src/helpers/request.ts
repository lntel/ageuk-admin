import { toast } from "react-toastify";

const apiUrl = "http://localhost:5000";

export type RequestDataType = | 'GET' | 'POST' | 'PATCH' | 'DELETE';
export interface RequestData {
    type?: RequestDataType;
    url: string;
    data?: object;
}

const request = async (requestData: RequestData) => {
    const request = await fetch(`${apiUrl}${requestData.url}`, {
        method: requestData.type ?? 'GET',
        body: requestData.data ? JSON.stringify(requestData.data) : null,
        headers: {
            'content-type': 'application/json'
        }
    });

    if(request.status === 429) {
        toast.error("You are making too many requests, please wait and try again");
    }

    return request;
}

export default request;