import {AppCredentials} from "../../src/domain/domain";
import {Authenticator} from "../../src/sm/authentication/authentication.sm";

export abstract class Authenticators {
    static alwaysAuthenticatesSuccessfullyWith (appCredentials: AppCredentials): Authenticator {
        return (authenticatingActions) =>  {
            authenticatingActions.doSuccess(appCredentials);
        };
    }
}
