let initialState = {
    dialogsData: [
        {id: 1, name: "Dimych", imgSrc: "./images/racon.jpg"},
        {id: 2, name: "Kristina", imgSrc: "./images/girl.jpg"},
        {id: 3, name: "Janet", imgSrc: "./images/mask.jpg"},
        {id: 4, name: "Svetlana", imgSrc: "./images/fox.png"},
        {id: 5, name: "Andrey", imgSrc: "./images/minion.jpg"},
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-camasutra?"},
        {id: 3, message: "Hello from React-app"},
        {id: 4, message: "Do you Know React?"},
        {id: 5, message: "No"},
    ] as Array<MessagesType>,

}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case "SN/SEND-MESSAGE":
            let body = action.newMessageBody
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer

type DialogType = {
    id: number
    name: string
    imgSrc: string
}
type MessagesType = {
    id: number
    message: string
}
export type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof actions.sendMessage>
