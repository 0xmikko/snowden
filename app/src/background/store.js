import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import * as actions from '../actions';
import * as actionsEncrypt from './actions/encrypt';
import * as actionsDecrypt from './actions/decrypt';
import * as actionsSettings from './actions/settings';
import reducer from './reducers/index';

const store = createStore(reducer);

const actionsToPopup = {};

// Actions to be exported to Popup
actionsToPopup[actions.ENCRYPT_POST_INIT] = actionsEncrypt.encryptInit;
actionsToPopup[actions.ENCRYPT_POST_REQUEST] = (post) => actionsEncrypt.encryptPost(post);
actionsToPopup[actions.CHECK_PAGE] = (content) => actionsDecrypt.checkPage(content);
actionsToPopup[actions.SETTINGS_REQUEST] = actionsSettings.getSettings;

export default createBackgroundStore({
    store,
    actions: {
        ...actionsToPopup
    }
});
