import profileReducer, {actions} from "./profile-reducer";
import {ProfileType} from "../types/types";


let initialState = {
    postsData: [
        {id: 1, post: 'lorem ipsum dolor', likesCount: 12},
        {id: 2, post: 'Why anyone love me', likesCount: 9},
        {id: 3, post: 'hi, how are you', likesCount: 14},
        {id: 4, post: 'This is last message today', likesCount: 9},
    ],
    profile: null as null | ProfileType,
    status: '',
    newPostText: ''
}


it('New post should be added', () => {
    let action = actions.addPostActionCreator("it-camasutra.com")



    let newState = profileReducer(initialState, action)

    expect(newState.postsData.length).toBe(5)

})

it('Message of new post should be: it-camasutra.com', () => {
    let action = actions.addPostActionCreator("it-camasutra.com")
    let newState = profileReducer(initialState, action)


    expect(newState.postsData[4].post).toBe("it-camasutra.com")
})


it('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1)



    let newState = profileReducer(initialState, action)


    expect(newState.postsData.length).toBe(3)
})
it('after deleting length should not be decrement if id is incorrect', () => {
    let action = actions.deletePost(1000)



    let newState = profileReducer(initialState, action)


    expect(newState.postsData.length).toBe(4)
})