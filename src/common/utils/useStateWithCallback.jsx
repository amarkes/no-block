import { useState, useEffect } from "react";

const useStateWithCallback = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const [callback, setCallback] = useState(null);

    const setStateWithCallback = (value, cb) => {
        setState(value);
        if (cb) {
            setCallback(() => cb);
        }
    };

    useEffect(() => {
        if (callback) {
            callback(state); // Executa o callback com o novo estado
            setCallback(null); // Limpa o callback
        }
    }, [state, callback]);

    return [state, setStateWithCallback];
};
export default useStateWithCallback;