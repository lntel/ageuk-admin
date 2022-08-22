import { toast } from "react-toastify";

const errorHandler = async (response: Response) => {

    switch(response.status) {
        case 429:
            toast.error("You are making too many requests, please wait and try again");
        break;

        case 400:

        const body = await response.json();

        const messages = body.message;

        toast.error(messages[0]);

        break;
    }

}

export default errorHandler;