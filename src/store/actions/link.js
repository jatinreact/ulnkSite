
import * as actionTypes from "./actionTypes";
import { getBaseUrl } from "../../utils";


export const linkCheckerStart=()=>{
    return{
        type:actionTypes.LINK_CHECKER_START,
    }
}

export const linkCheckerSuccess=(data)=>{
    console.log(data);
    return{
        type:actionTypes.LINK_CHECKER_SUCCESS,
        data:data
    }
   
}

export const linkCheckerFail=(err)=>{
    return{
        type:actionTypes.LINK_CHECKER_FAIL,
        err,
    }
}

export const LinkChecker=(token)=>{
    return async(dispatch)=>{
        dispatch(linkCheckerStart());

    try{
          const response = await fetch(getBaseUrl() + "links/link-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,
            }
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(linkCheckerSuccess(data));

     

    }catch(err){
        dispatch(linkCheckerFail(err.message));
    }
    }
}

//set icons

export const setIconStart=()=>{
    return{
        type:actionTypes.SET_ICON_START,
    }
}

export const setIconSuccess=(data)=>{
    console.log(data);
    return{
        type:actionTypes.SET_ICON_SUCCESS,
        data:data
    }
   
}

export const setIconFail=(err)=>{
    return{
        type:actionTypes.SET_ICON_FAIL,
        err,
    }
}

export const setIcon=(token,json)=>{
    return async(dispatch)=>{
        dispatch(setIconStart());

    try{
          const response = await fetch(getBaseUrl() + "links/icons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(json)
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(setIconSuccess(data));

     dispatch(getIcon(token));

    }catch(err){
        dispatch(setIconFail(err.message));
    }
    }
}

//get icon



export const getIconStart=()=>{
    return{
        type:actionTypes.GET_ICON_START,
    }
}

export const getIconSuccess=(data)=>{
    console.log(data);
    return{
        type:actionTypes.GET_ICON_SUCCESS,
        data:data
    }
   
}

export const getIconFail=(err)=>{
    return{
        type:actionTypes.GET_ICON_FAIL,
        err,
    }
}

export const getIcon=(token)=>{
    return async(dispatch)=>{
        dispatch(getIconStart());

    try{
          const response = await fetch(getBaseUrl() + "links/icon-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(getIconSuccess(data));

     

    }catch(err){
        dispatch(getIconFail(err.message));
    }
    }
}

//delete link

export const deleteLinkStart=()=>{
    return{
        type:actionTypes.DELETE_LINK_START,
    }
}

export const deleteLinkSuccess=(data)=>{
    
    return{
        type:actionTypes.DELETE_LINK_SUCCESS,
        data:data
    }
   
}

export const deleteLinkFail=(err)=>{
    return{
        type:actionTypes.DELETE_LINK_FAIL,
        err,
    }
}

export const deleteLink=(token,id)=>{
    return async(dispatch)=>{
        dispatch(deleteLinkStart());
        console.log(token,id);

    try{
          const response = await fetch(getBaseUrl() + "links/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify({linkId:id})
        })

        const data = await response.json(); 
        console.log(response)
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(deleteLinkSuccess(data));

     dispatch(getIcon(token));
     dispatch(LinkChecker(token));

    }catch(err){
        dispatch(deleteLinkFail(err.message));
    }
    }
}


//update link

export const updateLinkStart=()=>{
    return{
        type:actionTypes.UPDATE_LINK_START,
    }
}

export const updateLinkSuccess=(data)=>{
    
    return{
        type:actionTypes.UPDATE_LINK_SUCCESS,
        data:data
    }
   
}

export const updateLinkFail=(err)=>{
    return{
        type:actionTypes.UPDATE_LINK_FAIL,
        err,
    }
}

export const updateLink=(token,req)=>{
    return async(dispatch)=>{
        dispatch(updateLinkStart());
        console.log(token,req);

    try{
          const response = await fetch(getBaseUrl() + "links/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(req)
        })

        const data = await response.json(); 
        console.log(response)
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(updateLinkSuccess(data));

        
     dispatch(LinkChecker(token));
     dispatch(getIcon(token));

    }catch(err){
        dispatch(updateLinkFail(err.message));
    }
    }
}

//above link

export const aboveLinkStart=()=>{
    return{
        type:actionTypes.ABOVE_LINK_START,
    }
}

export const aboveLinkSuccess=(data)=>{
    
    return{
        type:actionTypes.ABOVE_LINK_SUCCESS,
        data:data
    }
   
}

export const aboveLinkFail=(err)=>{
    return{
        type:actionTypes.ABOVE_LINK_FAIL,
        err,
    }
}

export const aboveLink=(token,what,u_name)=>{
    return async(dispatch)=>{
        dispatch(aboveLinkStart());
        console.log(token);

    try{
          const response = await fetch(getBaseUrl() + "links/icons-position", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(what)
        })

        const data = await response.json(); 
        console.log(response)
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(aboveLinkSuccess(data));
     dispatch(getPublicLinks(token,u_name));

    }catch(err){
        dispatch(aboveLinkFail(err.message));
    }
    }
}


//get public link

export const getPublicLinksStart=()=>{
    return{
        type:actionTypes.GET_PUBLIC_LINK_START,
    }
}

export const getPublicLinksSuccess=(data)=>{
    
    return{
        type:actionTypes.GET_PUBLIC_LINK_SUCCESS,
        data:data
    }
   
}

export const getPublicLinksFail=(err)=>{
    return{
        type:actionTypes.GET_PUBLIC_LINK_FAIL,
        err,
    }
}

export const getPublicLinks=(token,u_name)=>{
    return async(dispatch)=>{
        dispatch(getPublicLinksStart());
        

    try{
        
          const response = await fetch(getBaseUrl() + "pub/links/"+u_name, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            },
        })

        console.log("called get public links");
        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        console.log(data);
        dispatch(getPublicLinksSuccess(data));


    }catch(err){
        dispatch(getPublicLinksFail(err.message));
    }
    }
}

