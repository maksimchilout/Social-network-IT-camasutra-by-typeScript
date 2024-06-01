import React from "react";
// @ts-ignore
import styles from "./users.module.css";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

let  User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {

    return (
        <div >
            <span >
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <div className={styles.avaContainer}>

                            <img className={styles.userPhoto}
                                 src={user.photos.small != null ? user.photos.small : './images/minion.jpg'}
                                 alt=""/>
                        </div>

                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button className={styles.buttonUnfollow}
                                  disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>Unfollow</button>
                        : <button className={styles.buttonFollow}
                                  disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User