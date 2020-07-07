import * as React from "react";
import {useState} from "react";
import {AuthenticationPanel, LoginForm} from "./LoginForm";
import {authentication$F, AuthenticationFlow} from "./authentication$F";
import {useFlow, useFlowStatus} from "conan-js-core";


interface AuthenticationState {
    current: "authenticating" | "notAuthenticated" | "authenticated" | "authenticationFailed";
    currentUser: string;
}

const onLoginClicked = (user: string, password: string) => {
    authentication$F.on("notAuthenticated").transitions.$toStatus({name: "authenticating", data: [user, password]});
}

const onLogoutClicked = () => {
    authentication$F.on("authenticated").transitions.$toStatus("notAuthenticated");
}

export const AuthenticationApp = () => {

    const [state, setState] = useState<AuthenticationState>({current: "notAuthenticated", currentUser: ""});

    useFlow<
        AuthenticationState,
        AuthenticationFlow
    >(authentication$F, setState, (status, previousState) => ({
        ...previousState,
        current: status.name,
    }));

    useFlowStatus<
        AuthenticationState,
        AuthenticationFlow,
        "authenticating"
    >(authentication$F, "authenticating", setState, (status, previousState) => ({
        ...previousState,
        currentUser: status[0]
    }));

    useFlowStatus<
        AuthenticationState,
        AuthenticationFlow,
        "notAuthenticated"
    >(authentication$F, "notAuthenticated", setState, (status, previousState) => ({
        ...previousState,
        currentUser: ""
    }));

    return <>
        <LoginForm login={onLoginClicked} logout={onLogoutClicked}
                   loginAvailable={state.current == "notAuthenticated"}/>
        <AuthenticationPanel message={state.current}/>
        <label>Current user: {state.currentUser}</label>
    </>;

}

