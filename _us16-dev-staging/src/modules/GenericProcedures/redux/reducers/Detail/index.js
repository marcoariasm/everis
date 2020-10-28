export default (state='', action) => {
    switch(action.type){
        case 'REGISTER':
            return {...state, comment:action.payload };
        default :
            return state;
    }
}