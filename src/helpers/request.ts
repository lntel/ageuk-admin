const apiUrl = "http://localhost:5000";

export interface RequestData {
    url: string;
    data?: object;
}

const get = async (requestData: RequestData) => {
    const request = await fetch(`${apiUrl}${requestData.url}`);

    return request;
}

export {
    get,
}