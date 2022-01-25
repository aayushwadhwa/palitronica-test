import { combineReducers } from "redux";

const itemsReducer = (items = [], action) => {
    console.log("Items Reducer", items, action);
    if (action.type === "FETCH_ITEMS") {
        return action.payload;
    }
    return items;
}

const customerReducer = (customers = [], action) => {
    console.log("Customers Reducer", customers, action);
    if (action.type === "FETCH_ITEMS") {
        return action.payload;
    }
    return customers;
}

const calcuateReducer = (calcuatedData = null, action) => {
    console.log("Selected User Reducer", calcuatedData, action);
    if (action.type === "CALCUATE") {
        return action.payload;
    }
    return calcuatedData;
}

const errorReducer = (errorMessage = null, action) => {
    console.log("Selected User Reducer", errorMessage, action);
    if (action.type === "ERROR") {
        return action.payload;
    }
    return errorMessage;
}

// const selectedUserReducer = (selectedUser = null, action) => {
//     console.log("Selected User Reducer", selectedUser, action);
//     if (action.type === "SELECT_USER") {
//         return action.payload;
//     }
//     return selectedUser;
// }

// const postsReducer = (posts = [], action) => {
//     console.log("Posts Reducer", posts, action);
//     if (action.type === "FETCH_POSTS") {
//         return action.payload;
//     }

//     return posts;
// }

export default combineReducers({
    items: itemsReducer,
    customers: customerReducer,
    calcuatedData: calcuateReducer,
    errorMessage: errorReducer
})