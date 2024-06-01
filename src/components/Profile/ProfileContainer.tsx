import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";



export interface WithRouterProps {
    params: ReturnType<typeof useParams>;
}
const withRouter = <Props extends WithRouterProps>(WrappedComponent: React.ComponentType<Props>) => (props: Omit<Props, keyof WithRouterProps>) => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...(props as Props)}
            params={params}
            // etc...
        />
    )
}

type MapPropsType = ReturnType<typeof  mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    params:{ userId: number | null}
}

type PropsType = MapPropsType & DispatchPropsType & PathParamsType;

class ProfileContainer extends React.Component<PropsType >{
    refreshProfile = () => {
        let userId = this.props.params.userId
        if (!userId) {
            userId =this.props.authorizedUserId
            if (!userId) {
                // @ts-ignore
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId as number)
        this.props.getStatus(userId as number)
    }
    componentDidMount() {
       this.refreshProfile()

    }
componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.params.userId !== prevProps.params.userId) {
        this.refreshProfile()
    }
    // let userId = this.props.params.userId
    // if (!userId) {
    //     userId =this.props.authorizedUserId
    // }
    // this.props.getUserProfile(userId)
    // this.props.getStatus(userId)

}

    render() {


        return (
            <Profile
                {...this.props}
                isOwner={!this.props.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
            />
        )
    }

}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

