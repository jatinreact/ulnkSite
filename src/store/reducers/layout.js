import * as actionTypes from "../actions/actionTypes"

const initialState = {
    setLayoutRes: null,
    loading: false,
    error: null
}


export const setLayoutStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        setLayoutRes: null
    }
}

export const setLayoutSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        setLayoutRes: action.data,
        error: null
    }


}

export const setLayoutFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}



const LayoutReducer = (state = initialState, action) => {

    switch (action.type) { // above link

        case actionTypes.SET_LAYOUT_START:
            return setLayoutStart(state, action);

        case actionTypes.SET_LAYOUT_SUCCESS:
            return setLayoutSuccess(state, action);

        case actionTypes.SET_LAYOUT_FAIL:
            return setLayoutFail(state, action);
   
        default:
            return state;
    }

}

export default LayoutReducer;
