import { useSelector } from "react-redux";

export function IsUser(){
    const user = useSelector(state=> state.user);
    if(user?.user){
        return true;
    } else{
        return false;
    }
}

export function IsUserCreator(){
    const user = useSelector(state=> state.user);
    const role = user?.user?.role;
    if(role.includes('CREATOR')){
        return true;
    } else{
        return false;
    }
}