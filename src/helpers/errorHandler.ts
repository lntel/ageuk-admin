import { toast } from "react-toastify";

const errorHandler = async (response: Response) => {

    let body;

    switch(response.status) {
        case 429:
            toast.error("You are making too many requests, please wait and try again");
        break;

        case 400:

        body = await response.json();

        let messages = body.message;

        toast.error(messages[0]);

        break;
    }

}

export default errorHandler;