import * as React from "react";
import {useState} from "react";
import {AuthenticationPanel, LoginForm} from "./components/LoginForm";
import {AuthenticationFlow, authenticationFlow} from "./flow/authenticationFlow";
import {useFlow, useFlowStatus} from "conan-js-core";


interface AuthenticationState {
    current: "authenticating" | "notAuthenticated" | "authenticated" | "authenticationFailed";
    currentUser: string;
}

const onLoginClicked = (user: string, password: string) => {
    authenticationFlow.on("notAuthenticated").transitions.$toStatus({name: "authenticating", data: [user, password]});
}

const onLogoutClicked = () => {
    authenticationFlow.on("authenticated").transitions.$toStatus("notAuthenticated");
}

export const AuthenticationApp = () => {

    const [state, setState] = useState<AuthenticationState>({current: "notAuthenticated", currentUser: ""});

    useFlow<
        AuthenticationState,
        AuthenticationFlow
    >(authenticationFlow, setState, (status, previousState) => ({
        ...previousState,
        current: status.name,
    }));

    useFlowStatus<
        AuthenticationState,
        AuthenticationFlow,
        "authenticating"
    >(authenticationFlow, "authenticating", setState, (status, previousState) => ({
        ...previousState,
        currentUser: status[0]
    }));

    useFlowStatus<
        AuthenticationState,
        AuthenticationFlow,
        "notAuthenticated"
    >(authenticationFlow, "notAuthenticated", setState, (status, previousState) => ({
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

