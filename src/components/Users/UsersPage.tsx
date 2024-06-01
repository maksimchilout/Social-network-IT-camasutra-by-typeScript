import {useSelector} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../commons/preloader/Preloader";
import {getIsFetching} from "../../redux/users-selector";
export const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)
    return <>
        <Preloader isFetching={isFetching}/>
        < Users/>
    </>

}
