import { toast } from "react-toastify";

const errorHandler = async (response?: Response) => {

    let body, messages;

    // Providing the toast id prevents duplicates from all api requests
    const toastUnresponsiveId = "unresponsive-api";

    // The api is not responding
    if(!response) 
        return toast.error("The server is currently unresponsive, please wait and try again", {
            toastId: toastUnresponsiveId
        });

    switch(response.status) {
        case 429:
            toast.error("You are making too many requests, please wait and try again");
        break;

        case 400:

        body = await response.json();

        messages = body.message;

        toast.error(messages[0]);

        break;

        case 409:

        body = await response.json();

        toast.error(body.message);

        break;
    }

}

export default errorHandler;