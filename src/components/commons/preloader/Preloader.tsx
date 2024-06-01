// @ts-ignore
import preloader from "../../../images/Spinner-1s-200px.svg";
import React from "react";
// @ts-ignore
import style from './preloade.module.css'

type PropsType = {
     isFetching: boolean
}
let Preloader: React.FC<PropsType> = ({isFetching}) => {
    return (
        <div className={style.preloadContainer}>
            {isFetching ? <img src={preloader} alt='preloader'/> : null}
        </div>
    )
}

export default Preloader