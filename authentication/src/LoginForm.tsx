import * as React from "react";
import {useState} from "react";
import {IBiConsumer, ICallback} from "conan-js-core";

interface LoginFormProps {
    login: IBiConsumer<string, string>;
    logout: ICallback;
    loginAvailable: boolean;
}

export const LoginForm = ({login, loginAvailable, logout}: LoginFormProps) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        login(userName, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName" style={{marginRight: 5}}>
                    userName:
                </label>
                <input name="userName" onChange={e => setUserName(e.target.value)}/>
                <label htmlFor="password" style={{marginRight: 5, marginLeft: 10}}>
                    Password:
                </label>
                <input name="password" type="password" onChange={e => setPassword(e.target.value)}/>
                {loginAvailable && <button
                    type="submit"
                    style={{marginLeft: 5}}
                >
                    Login
                </button>}
                {!loginAvailable && <button
                    type="button"
                    style={{marginLeft: 5}}
                    onClick={logout}
                >
                    Logout
                </button>}
            </div>
        </form>
    )
}

interface AuthenticationPanel {
    message: string;
}

export const AuthenticationPanel = ({message}: AuthenticationPanel) => {

    return <div id="panel"><label htmlFor="userName" style={{marginRight: 5}}>
        {message}
    </label></div>
}
