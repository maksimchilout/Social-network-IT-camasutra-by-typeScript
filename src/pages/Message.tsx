import React from "react";
import { ChatMessageType } from "./Messages";
export const Message: React.FC<{message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img style={{width: '30px'}} src={message.photo} alt={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}