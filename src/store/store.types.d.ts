import { AuthState } from "./authReducer/authReducer.types";
import { UserState } from "./userReducer/userReducer.types";
export type StoreReducerStateTypes = {
    auth: AuthState;
    user: UserState;
    config: UserState;
};
