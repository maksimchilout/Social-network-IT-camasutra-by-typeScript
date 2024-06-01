// @ts-ignore
import s from "./ProfileInfo.module.css";
import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../commons/FormsControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={s.profileInfo}>
            <div><button>save</button></div>
            {error && <div>

                {error}
            </div>
            }
            <div>
                <b>Full name:</b> {createField<ProfileTypeKeys>("Full name", "fullName", [], Input,)}
            </div>
            <div>adm
                <b>Looking for a job:</b> {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skill:</b>
                {createField<ProfileTypeKeys>("My professional skill", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me:</b>
                {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm