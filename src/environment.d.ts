declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_SERVER_ENDPOINT: string;
        }
    }
}

export {};
