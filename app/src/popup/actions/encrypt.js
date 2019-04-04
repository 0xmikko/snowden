import * as actions from '../../actions';

export const encryptPost = (post, hash) => {
    return {
        type: actions.ENCRYPT_POST_REQUEST,
        hash: hash,
        ...post
    };

};

export const encryptInit = () => {
    console.log("INIT");

    return {
        type: actions.ENCRYPT_POST_INIT,
    };
}