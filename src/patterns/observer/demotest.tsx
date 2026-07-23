import { useSyncExternalStore } from "react";
import { testToastStore } from "./test";

const useToasts = ()=>{
    return useSyncExternalStore(testToastStore.subscribe, testToastStore.getSnapshot)
}

const ToastContainer = ()=>{
    const toast = useToasts()

    return (
        <>
        </>
    )
}