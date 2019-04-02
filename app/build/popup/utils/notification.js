import {error, success, info} from "react-notification-system-redux";

export const transactError = (message) =>
{
   return error({
                    title: "Transaction error",
                    message: message,
                    position: 'tr',
                    action: {
                        label: 'Got it!'
                    }
                })
}

export const transactSuccess = (transactionHash) =>
{
    return success({
                    title: "Transaction complete!",
                    message: "Transaction hash: " + transactionHash,
                    position: 'tr',
                    autoDismiss: 5,
                    action: {
                        label: 'Open in Etherscan',
                        callback: () => {
                            const url = 'https://kovan.etherscan.io/tx/' + transactionHash;
                            let win = window.open(url, '_blank');
                            win.focus();
                        }
                    }
                })
}

export const notifyInfo = (title, msg) =>
{
    return info({
                    title: title,
                    message: msg,
                    position: 'tr',
                    action:
                        {
                            label: "Got it"
                        }
                })
}
