// Updating state immutable

//import {error, success} from "react-notification-system-redux";

export const updateState = (oldState, newValues) =>
    (
        {
            ...oldState,
            ...newValues
        }
    )


/*
export const notifyError = (message) =>
{
   return error({
                    title: "Internal error",
                    message: message,
                    position: 'tr',
                    action: {
                        label: 'Got it!'
                    }
                })
}
*/
