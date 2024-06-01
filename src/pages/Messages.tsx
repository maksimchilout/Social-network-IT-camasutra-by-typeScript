import React, { useEffect, useState } from "react";
import { Message }                    from "./Message";

export const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        })
    }, []);
    // @ts-ignore
    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => < Message key={index} message={m}/>)}
        </div>

    )
};