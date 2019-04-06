import * as actions from "../../actions";

export const setConnectionStatus = (status, extensionID) => (
    {
        type: actions.UPDATE_CONNECTION_STATUS,
        status: status,
        ext_id: extensionID
    }
)