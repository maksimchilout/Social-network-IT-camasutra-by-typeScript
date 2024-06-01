import React from "react";
// @ts-ignore
import s from "./Dialog.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageFormRedux from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}
const Dialogs: React.FC<PropsType> = (props) => {
    console.log(props)
    let state = props.dialogsPage
    let dialogsElements = state.dialogsData
        .map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} src={dialog.imgSrc}/>)

    let messageElements = state.messagesData.map(a => <Message message={a.message} key={a.id}/>)

    let addNewMessage = (values:NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>)
}

export default Dialogs