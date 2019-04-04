import { combineReducers } from 'redux'

import encrypt from './encrypt';
import decrypt from './decrypt';
import connection from './connection';
import settings from './settings';


export default combineReducers({

   connection,
   encrypt,
   decrypt,
   settings

})

