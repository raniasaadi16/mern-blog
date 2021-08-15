import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";
import CategoryReducer from "./CategoryReducer";
import CommentReducer from "./CommentReducer";
import UserReducer from "./UsersReducer";
import ErrReducer from "./ErrReducer";

const allReducers = combineReducers({
    auth: AuthReducer,
    posts: PostReducer,
    category: CategoryReducer,
    comments: CommentReducer,
    users: UserReducer,
    err: ErrReducer
});

export default allReducers;