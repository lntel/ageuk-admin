import { toast } from "react-toastify";
import errorHandler from "./errorHandler";

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

    if(!request.ok) errorHandler(request);

    return request;
}

export default request;