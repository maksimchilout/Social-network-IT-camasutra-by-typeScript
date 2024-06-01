import React from "react";
import { Messages }         from "./Messages";
import { AddMessageForm } from "./AddMessageForm";


export const Chat: React.FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>

    )
}
