import React from "react";
// @ts-ignore
import s from './Post.module.css'
// @ts-ignore
import anonumAva from '../../../../images/anonum.jpg'

type PropsType = {
    message: string
    likesCount: number
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={s.item}>
                <div className={s.avatarWrapper}>
                    <img className={s.avatar} src={anonumAva} alt='ava'/>
                </div>
                <div className={s.postMessage}>{props.message}</div>


            </div>
            <div className={s.likes}>Likes: {props.likesCount}</div>
        </div>

    )
}

export default Post