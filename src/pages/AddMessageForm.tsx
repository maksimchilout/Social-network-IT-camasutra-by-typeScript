import React, { useState } from "react";
import { wsChannel }       from "./Messages";

export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} name="li" id="2"></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )
};