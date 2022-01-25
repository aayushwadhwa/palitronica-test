import jsonPlaceholder from "../apis/api"

export const fetchItems = () => {
    return function (dispactch, getState) {
        jsonPlaceholder.get("/items").then(response => {
            dispactch({
                type: "FETCH_ITEMS",
                payload: response.data
            })
        })
    }
}

export const fetchCustomers = () => {
    return function (dispactch, getState) {
        jsonPlaceholder.get("/customers").then(response => {
            dispactch({
                type: "FETCH_CUSTOMERS",
                payload: response.data
            })
        })
    }
}

export const calculate = req => {
    return function (dispactch) {
        jsonPlaceholder.post("/calculate", req).then(response => {
            dispactch({
                type: "CALCUATE",
                payload: response.data
            })
        }).catch(() => {
            dispactch({
                type: "ERROR",
                payload: "Make sure that you have correct customer id and some items. Use Customer ID = 1 and try again"
            })
        })
    }
}

export const resetState = () => {
    return function(dispactch) {
        dispactch({
            type: "CALCUATE",
            payload: null
        })
        dispactch({
            type: "ERROR",
            payload: null
        })
    }
}