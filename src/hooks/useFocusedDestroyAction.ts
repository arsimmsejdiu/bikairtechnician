import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useEffect, useRef} from "react";

export default function useFocusedDestroyAction(callback: () => void) {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useFocusEffect(
        useCallback(() => {
            return () => {
                if (typeof savedCallback.current !== "undefined") {
                    savedCallback.current();
                }
            };
        }, [])
    );
}
