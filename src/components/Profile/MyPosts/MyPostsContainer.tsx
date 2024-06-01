
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {DispatchPostsPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps =(state: AppStateType) => {
    return {
        posts: state.profilePage.postsData
    }
}

const  MyPostsContainer = connect<MapPropsType, DispatchPostsPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts)
export default MyPostsContainer

