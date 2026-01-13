import { AuthState } from "./authReducer.types";
export declare const authInitialState: AuthState;
export declare const auth: import("@reduxjs/toolkit").Slice<AuthState, {
    onLoginSuccess: (state: {
        token: string;
        isAuthorized: boolean;
    }, { payload }: {
        payload: any;
        type: string;
    }) => void;
    onLogOutAction: (state: {
        token: string;
        isAuthorized: boolean;
    }) => void;
}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<AuthState>>;
export declare const onLoginSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/onLoginSuccess">, onLogOutAction: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/onLogOutAction">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
