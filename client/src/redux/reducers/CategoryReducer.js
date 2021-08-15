import { GET_CATEGORIES, UPDATE_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY } from "../actions/types";

const initialState = {
    category: null,
    msg: null
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                category: action.payload.data.categories
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload.data.category]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                msg: action.payload.message,
                category: state.category.filter(cat => cat._id !== action.payload.data.category._id)
            }
        default:
            return state;
    }
};

export default CategoryReducer;