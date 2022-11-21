import { EventSourcePolyfill } from "event-source-polyfill";
import errorHandler from "./errorHandler";

// uon@ddns.net
const apiUrl = "http://localhost:5000";

export type RequestDataType = | 'GET' | 'POST' | 'PATCH' | 'DELETE';
export interface RequestData {
    type?: RequestDataType;
    shouldRefresh?: boolean;
    url: string;
    data?: object;
    formData?: FormData;
    disableDefaultHeaders?: boolean;
    headers?: {
        [key: string]: string;
    }
}

type TokenData = {
    accessToken: string;
    refreshToken: string;
}

export const Sse = (url: string, accessToken: string) => {
    return new EventSourcePolyfill(`${apiUrl}${url}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

// TODO this needs a way to refresh either access or refresh tokens individually
/**
 * Refreshes both the access token and refresh token
 * @param refreshToken The valid refresh token
 * @returns TokenData object containing JWT tokens
 */
const refreshTokens = async (refreshToken: string): Promise<TokenData | undefined> => {
    const response = await request({
        type: 'POST',
        url: '/auth/refresh',
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    });

    if(!response.ok) return undefined;

    const tokens = await response.json();

    return tokens;
}

/**
 * The request method wraps JS fetch to provide error handling and ease-of-use of the fetch api
 * @param requestData An object containing request data
 * @returns Response containing HTTP data
 */
const request = async (requestData: RequestData): Promise<Response> => {
    let response;

    try {

        let body: any;

        if(requestData.data)
            body = JSON.stringify(requestData.data);

        if(requestData.formData) 
            body = requestData.formData;

        const headers: HeadersInit = {
            'content-type': 'application/json',    
        };

        if(requestData.disableDefaultHeaders)
            delete headers['content-type'];

        response = await fetch(`${apiUrl}${requestData.url}`, {
            method: requestData.type ?? 'GET',
            body,
            headers: {
                ...headers,
                ...requestData.headers
            }
        });

    } catch (error) {
        errorHandler();

        return Promise.reject();
    }


    if(requestData.shouldRefresh || requestData.shouldRefresh === undefined) {
        const tokens = localStorage.getItem("tokens");
    
        const refreshToken = tokens ? JSON.parse(tokens).refreshToken : "";

        if(response.status === 401 && refreshToken) {
            const tokens = await refreshTokens(refreshToken);
    
            // TODO add error handling here
            if(!tokens) {
                window.location.href = "/";
            }
            
            localStorage.setItem("tokens", JSON.stringify(tokens));
            
            response = await request({
                ...requestData,
                headers: {
                    'Authorization': `Bearer ${tokens?.accessToken}`
                }
            });
        }
    }        

    if(!response.ok) errorHandler(response);

    return response;
}

export default request;