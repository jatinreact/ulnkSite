import * as actionTypes from "../actions/actionTypes"


const initialState = {

    links: null,
    iconRes: null,
    iconList: null,
    delLinkRes: null,
    updLinkRes: null,
    abovelinkRes: null,
    getPublicLinkRes:null,
    loading: false,
    error: null
}

export const linkCheckerStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        links: null
    }
}

export const linkCheckerSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        links: action.data,
        error: null
    }


}

export const linkCheckerFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}

// set icon

export const setIconStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        iconRes: null
    }
}

export const setIconSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        iconRes: action.data,
        error: null
    }


}

export const setIconFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const getIconStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        iconList: null
    }
}

export const getIconSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        iconList: action.data,
        error: null
    }


}

export const getIconFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const deleteLinkStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        delLinkRes: null
    }
}

export const deleteLinkSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        delLinkRes: action.data,
        error: null
    }


}

export const deleteLinkFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const updateLinkStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        updLinkRes: null
    }
}

export const updateLinkSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        updLinkRes: action.data,
        error: null
    }


}

export const updateLinkFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}


export const aboveLinkStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        abovelinkRes: null
    }
}

export const aboveLinkSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        abovelinkRes: action.data,
        error: null
    }


}

export const aboveLinkFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}

//get public link
export const getPublicLinkStart = (state, action) => {
      return {
          ...state,
          loading: true,
          error: null,
          getPublicLinkRes: null
      }
  }
  
  export const getPublicLinkSuccess = (state, action) => {
      return {
          ...state,
          loading: false,
          getPublicLinkRes: action.data,
          error: null
      }
  
  
  }
  
  export const getPublicLinkFail = (state, action) => {
      return {
          ...state,
          loading: false,
          error: action.err
      }
  }
  
const LinkCheckerReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LINK_CHECKER_START:
            return linkCheckerStart(state, action);

        case actionTypes.LINK_CHECKER_SUCCESS:
            return linkCheckerSuccess(state, action);


        case actionTypes.LINK_CHECKER_FAIL:
            return linkCheckerFail(state, action);

            // set icons

        case actionTypes.SET_ICON_START:
            return setIconStart(state, action);

        case actionTypes.SET_ICON_SUCCESS:
            return setIconSuccess(state, action);


        case actionTypes.SET_ICON_FAIL:
            return setIconFail(state, action);

            // get icons

        case actionTypes.GET_ICON_START:
            return getIconStart(state, action);

        case actionTypes.GET_ICON_SUCCESS:
            return getIconSuccess(state, action);

        case actionTypes.GET_ICON_FAIL:
            return getIconFail(state, action);
            // delete link

        case actionTypes.DELETE_LINK_START:
            return deleteLinkStart(state, action);

        case actionTypes.DELETE_LINK_SUCCESS:
            return deleteLinkSuccess(state, action);


        case actionTypes.DELETE_LINK_FAIL:
            return deleteLinkFail(state, action);

            // update link

        case actionTypes.UPDATE_LINK_START:
            return updateLinkStart(state, action);

        case actionTypes.UPDATE_LINK_SUCCESS:
            return updateLinkSuccess(state, action);


        case actionTypes.UPDATE_LINK_FAIL:
            return updateLinkFail(state, action);

 // above link

 case actionTypes.ABOVE_LINK_START:
      return aboveLinkStart(state, action);

  case actionTypes.ABOVE_LINK_SUCCESS:
      return aboveLinkSuccess(state, action);


  case actionTypes.ABOVE_LINK_FAIL:
      return aboveLinkFail(state, action);

      
 // get public link

 case actionTypes.GET_PUBLIC_LINK_START:
      return getPublicLinkStart(state, action);

  case actionTypes.GET_PUBLIC_LINK_SUCCESS:
      return getPublicLinkSuccess(state, action);


  case actionTypes.GET_PUBLIC_LINK_FAIL:
      return getPublicLinkFail(state, action);


        default:
            return state;
    }

}

export default LinkCheckerReducer;
