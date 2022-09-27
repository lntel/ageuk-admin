import errorHandler from "./errorHandler";

const apiUrl = "http://localhost:5000";

export type RequestDataType = | 'GET' | 'POST' | 'PATCH' | 'DELETE';
export interface RequestData {
    type?: RequestDataType;
    shouldRefresh?: boolean;
    url: string;
    data?: object;
    headers?: {
        [key: string]: string;
    }
}

type TokenData = {
    accessToken: string;
    refreshToken: string;
}

export const Sse = (url: string) => {
    return new EventSource(`${apiUrl}${url}`);
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
            'Authorization': `Bearer ${refreshToken}`
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
        response = await fetch(`${apiUrl}${requestData.url}`, {
            method: requestData.type ?? 'GET',
            body: requestData.data ? JSON.stringify(requestData.data) : null,
            headers: {
                'content-type': 'application/json',
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