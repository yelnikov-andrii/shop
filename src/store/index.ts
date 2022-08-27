import { legacy_createStore as createStore } from 'redux';
import { storeReducer } from './storeReducer';


const store = createStore(storeReducer);

export default store;
export type RootState = ReturnType<typeof storeReducer>;
