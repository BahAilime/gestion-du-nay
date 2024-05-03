import { useState } from 'react';

export default function useMultiState(): [any, (key: string, value: string) => void, (key: string) => string, (key: string) => void, (data: object) => void] {
    const [data, setData] = useState({});

    function addState(key: string, value: string) {
        if (value === "") {
            deleteState(key);
        } else {
            setData({...data, [key]: value});
        }
    }

    function getState(key: string) {
        return (data as any)[key];
    }

    function deleteState(key: string) {
        delete (data as any)[key];
        setData({...data});
    }

    function setState(data: any) {
        setData(data);
    }

    return [data, addState, getState, deleteState, setState];
}