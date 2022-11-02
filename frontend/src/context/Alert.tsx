import {createContext, useContext, useState} from "react";
import {Alert, AlertColor} from "@mui/material";
import './Alert.css'

export interface AlertContextState {
    text: string
    type: AlertColor | undefined
}

const initialState: AlertContextState = {
    text: '',
    type: undefined,
};

const ALERT_TIME = 10000;

export const AlertContext = createContext({
    ...initialState,
    setAlert: (alert: AlertContextState) => {
    },
    closeAlert: () => {
    }
});


export const AlertProvider = ({children}: any) => {
    const [text, setText] = useState('');
    const [type, setType] = useState<AlertColor | undefined>(undefined);

    const setAlert = ({text, type}: AlertContextState) => {
        setText(text);
        setType(type);
        // setTimeout(() => {
        //     if (text != '' && !!type) {
        //         setText('');
        //         setType(undefined);
        //     }
        // }, ALERT_TIME);
    }

    const closeAlert = () => {
        setText('');
        setType(undefined);
    }

    return (
        <AlertContext.Provider
            value={{
                text,
                type,
                setAlert,
                closeAlert
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext)

export const AlertPopup = () => {
    const {text, type, closeAlert} = useAlert();

    if (text && type) {
        return (
            <div className="AlertModal">
                <Alert
                    severity={type}
                    onClose={() => {
                        closeAlert()
                    }}
                    sx={{mb: 2}}
                >
                    {text}
                </Alert>
            </div>)
    } else {
        return <></>;
    }
};

