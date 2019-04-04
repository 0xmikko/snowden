import * as actions from "../../actions";

export const setConnectionStatus = (status) => (
    {
        type: actions.UPDATE_CONNECTION_STATUS,
        status: status
    }
)