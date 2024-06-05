import {configureStore} from "@reduxjs/toolkit";
import { authApi } from "./APIs/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    // Cache, Polling , invalidate cache
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
    )
})
setupListeners(store.dispatch)
//refetchOnReconnect, refetchOnFocus
// YAGNI (
//setupListeners(store.dispatch)
