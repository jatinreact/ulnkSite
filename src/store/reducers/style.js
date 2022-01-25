import * as actionTypes from "../actions/actionTypes"


const initialState = {
    editProfileRes: null,
    enbShareBtnRes:null,
    setVideoRes:null,
    addFaviconRes:null,
    setPageTitlesRes:null,
    loading: false,
    error: null
}


export const editProfileStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        editProfileRes: null
    }
}

export const editProfileSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        editProfileRes: action.data,
        error: null
    }


}

export const editProfileFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const enbShareBtnStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        enbShareBtnRes: null
    }
}

export const enbShareBtnSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        enbShareBtnRes: action.data,
        error: null
    }


}

export const enbShareBtnFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const setVideoStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        setVideoRes: null
    }
}

export const setVideoSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        setVideoRes: action.data,
        error: null
    }


}

export const setVideoFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const addFaviconStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        addFaviconRes: null
    }
}

export const addFaviconSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        addFaviconRes: action.data,
        error: null
    }


}

export const addFaviconFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}

export const setPageTitlesStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        setPageTitlesRes: null
    }
}

export const setPageTitlesSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        setPageTitlesRes: action.data,
        error: null
    }


}

export const setPageTitlesFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}



const StyleReducer = (state = initialState, action) => {

    switch (action.type) { // above link

        case actionTypes.EDIT_PROFILE_START:
            return editProfileStart(state, action);

        case actionTypes.EDIT_PROFILE_SUCCESS:
            return editProfileSuccess(state, action);


        case actionTypes.EDIT_PROFILE_FAIL:
            return editProfileFail(state, action);


            case actionTypes.ENB_SHARE_BTN_START:
                return enbShareBtnStart(state, action);
    
            case actionTypes.ENB_SHARE_BTN_SUCCESS:
                return enbShareBtnSuccess(state, action);
    
    
            case actionTypes.ENB_SHARE_BTN_FAIL:
                return enbShareBtnFail(state, action);

                
            case actionTypes.SET_VIDEO_START:
                return setVideoStart(state, action);
                
            case actionTypes.SET_VIDEO_SUCCESS:
                return setVideoSuccess(state, action);
    
            case actionTypes.SET_VIDEO_FAIL:
                return setVideoFail(state, action);

                     
            case actionTypes.SET_FAV_START:
                return addFaviconStart(state, action);
                
            case actionTypes.SET_FAV_SUCCESS:
                return addFaviconSuccess(state, action);
    
            case actionTypes.SET_FAV_FAIL:
                return addFaviconFail(state, action);

                case actionTypes.SET_PAGE_TITLES_START:
                return setPageTitlesStart(state, action);
                
            case actionTypes.SET_PAGE_TITLES_SUCCESS:
                return setPageTitlesSuccess(state, action);
    
            case actionTypes.SET_PAGE_TITLES_FAIL:
                return setPageTitlesFail(state, action);

    
        default:
            return state;
    }

}

export default StyleReducer;
