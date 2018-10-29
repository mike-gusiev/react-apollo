import {takeLatest, put} from 'redux-saga/effects';
import { addProductMutation, getProductsQuery} from '../queries/queries';

// actionTypes
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const ADD_PRODUCT = 'ADD_PRODUCT';
const PRODUCT_ADDED = 'PRODUCT_ADDED';

// Reducer
const initialState = {
    data: null,
    loading: true,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                loading: true
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case ADD_PRODUCT:
            return {
                ...state,
                loading: false,
            };
        case PRODUCT_ADDED:
            return {
                loading: false,
                data: [...state.data, action.data]
            };

        default:
            return state
    }
};

export default reducer;

// Saga
export function* fetchProductsSaga(action) {
    try {
        const res = yield action.client.query({query: getProductsQuery});
        yield put({type: LOAD_SUCCESS, data: res.data.products})
    } catch (error) {
        yield put({type: LOAD_FAILURE, error: error})
    }
}

export function* addProductsSaga(action) {
    const res = yield action.client.mutate({
        mutation: addProductMutation,
        variables: {
            name: action.vars.name,
            category: action.vars.category,
            brandId: action.vars.brandId
        }
    });
    yield put({type: PRODUCT_ADDED, data: res.data.addProduct})
}

export function* watchRequest() {
    yield takeLatest(ADD_PRODUCT, addProductsSaga)
    yield takeLatest(LOAD_PRODUCTS, fetchProductsSaga)
}

export const loadProducts = (client) => {
    return {
        type: LOAD_PRODUCTS,
        client
    };
};

export const addProducts = (client, vars) => {
    return {
        type: ADD_PRODUCT,
        client,
        vars
    };
};