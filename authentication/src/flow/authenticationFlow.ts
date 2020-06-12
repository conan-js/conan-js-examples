import {Flows} from "conan-js-core";

export type Token = string;

class DummyAuthenticator {
    public static authenticate(password: string): boolean {
        return password == "lolito";
    }
}

export interface AuthenticationFlow {
    notAuthenticated: void;
    authenticating: [string, string];
    authenticated: Token;
    authenticationFailed: void;
}

export let authenticationFlow = Flows.create<AuthenticationFlow>({
    name: 'authentication',
    statuses: {
        notAuthenticated: {},
        authenticated: {},
        authenticating: {
            reactions: [
                onAuthenticating => {
                    let valid = DummyAuthenticator.authenticate(onAuthenticating.getData()[1]);
                    const nextStatus = valid ? {
                        name: "authenticated" as any,
                        data: "TOKEN"
                    } : {name: "authenticationFailed"};
                    setTimeout(() => onAuthenticating.do.$toStatus(nextStatus), 2000);
                }
            ],
        },
        authenticationFailed: {
            reactions: [
                onAuthenticationFailed => setTimeout(() => onAuthenticationFailed.do.$toStatus("notAuthenticated"), 2000)
            ],
        }
    },
    initialStatus: {
        name: 'notAuthenticated',
    }
});

authenticationFlow.start();
