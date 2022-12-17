import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyBf715Cy8sr8W424V1t3QhNyrIju8P5eeE",
    authDomain: "bootcamp-87ea5.firebaseapp.com",
    databaseURL: "https://bootcamp-87ea5-default-rtdb.firebaseio.com",
    projectId: "bootcamp-87ea5",
    storageBucket: "bootcamp-87ea5.appspot.com",
    messagingSenderId: "467709545465",
    appId: "1:467709545465:web:9445e3189a981a0609cb28"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
);

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//     document.getElementById('root'),
// );
