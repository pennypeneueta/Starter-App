const defaultState = {
    user : {}
}

export default function reducer(state = defaultState, { type, payload } : { type: string, payload : any}
    ): any {

    //works with state
    switch(type) {
        case 'SET_USER_STATE':
            return {
                ...state,
                user: {
                    //username as payload
                    username : payload.split('@')[0]  
                }
            }
    }

    return state
}
