import React from "react";
// @ts-ignore
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../commons/FormsControls/FormControls";
import {PostType} from "../../../types/types";

const maxLength10 = maxLengthCreator(10)

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPostsPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPostsPropsType> = ((props) => {
    let postsElements = props.posts.map(el => <Post message={el.post} key={el.id} likesCount={el.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)

    }

    return (

        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postsElements}

            </div>
        </div>
    )
})

type PropsType = {
}
type AddPostFormValuesType = {
    newPostText: string
}
const AddNewPost: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form className={s.myPost} onSubmit={props.handleSubmit}>
            <div className={s.myPost__containerInput}>
                <Field className={s.myPost__input} name="newPostText" placeholder="Post message" component={Textarea} validate={[required, maxLength10]}/>
            </div>
            <div className={s.myPost__containerButton}>
                <button className={s.myPost__button}>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostForm = reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileAddNewPostForm"})(AddNewPost)

const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized

