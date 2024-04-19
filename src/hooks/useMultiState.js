import { useState } from 'react';

export default function useMultiState() {
    const [data, setData] = useState({});

    function addState(key, value) {
        if (value === "") {
            deleteState(key);
        } else {
            setData({...data, [key]: value});
        }
    }

    function getState(key) {
        return data[key];
    }

    function deleteState(key) {
        delete data[key];
        setData({...data});
    }

    function setState(data) {
        setData(data);
    }

    return [data, addState, getState, deleteState, setState];
}