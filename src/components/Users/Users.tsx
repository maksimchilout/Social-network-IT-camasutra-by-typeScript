import React, {useEffect} from "react";
import Paginator from "../commons/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, requestUsers, follow, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUserCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selector";
import {useNavigate, useSearchParams} from "react-router-dom";
import queryString from 'query-string';


type paramsFormType = { page?: string, term?: string, friend?: string };
let Users: React.FC = () => {
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const totalUsersCount = useSelector(getTotalUserCount)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch= useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const query : paramsFormType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        console.log(queryString.stringify(query))
        navigate('/developers?' + queryString.stringify(query))
    }, [filter, currentPage]);


    useEffect(() => {
        const params = {} as paramsFormType
        searchParams.forEach((value, key) => {
            // @ts-ignore
            params[key] = value;
        })

        let actualPage = currentPage
        let actualFilter = filter

        if(!!params.page) actualPage = Number(params.page)
        if(!!params.term) actualFilter = {...actualFilter, term: params.term}
        switch (params.friend) {
            case "null" :
                actualFilter = {...actualFilter, friend: null}
                break
            case "true" :
                actualFilter = {...actualFilter, friend: true}
                break
            case "false" :
                actualFilter = {...actualFilter, friend: false}
                break
        }

        // @ts-ignore
        dispatch(requestUsers(actualPage, pageSize, actualFilter))},
        [])


    const followU = (userId: number) => {
        // @ts-ignore
        dispatch(follow(userId))
    }
    const unfollowU = (userId: number) => {
        // @ts-ignore
        dispatch(unfollow(userId))
    }
    const onFilterChange = (filter: FilterType) => {
        // @ts-ignore
        dispatch(requestUsers(currentPage, pageSize, filter))
    }
    const onPageChange = (pageNumber: number) => {
        // @ts-ignore
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    return (
        <div>
            <UsersSearchForm  onFilterChange={onFilterChange}/>
            <Paginator
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                totalItemsCount={totalUsersCount}
            />
            <div>
                {
                    users.map(u => {
                        return (
                            <User user={u}
                                  key={u.id}
                                  followingInProgress={followingInProgress}
                                  follow={followU}
                                  unfollow={unfollowU}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Users