import {expect} from "chai";
import {defaultTranslations, Translations} from "../../src/domain/translations";
import {MainSm} from "../../src/sm/main/main.sm";
import {ListenerType} from "../../lib/conan-sm/stateMachineListeners";
import {AuthenticationPrototype, AuthenticationSmListener} from "../../src/sm/authentication/authentication.sm";
import {AuthenticationSmJoiner} from "../../dist/conan-ui-core/src/main/sm/authentication/authentication.sm";
import {Authenticators} from "../utils/authenticators";

describe('main test', () => {
    const TRANSLATIONS: Translations = defaultTranslations;


    it("should start automatically initializing a state machine", (done) => {
        new MainSm((actions) => actions.doInitialise(TRANSLATIONS)).define()
            .start('main-test1')
    });

    it("should join with an authentication sm", (done) => {
        new MainSm((actions) => actions.doInitialise(TRANSLATIONS)).define()
            .addListener(['testMainListener', {
                onShowingApp: (_, params) => params.sm.stop(),
            }])
            .addListener(['stop=>test', {
                onStop: (_, params) => {
                    expect(params.sm.getEvents()).to.deep.eq(SerializedSmEvents.events(initializationFork));
                    done();
                }
            }])
            .sync <AuthenticationSmListener, AuthenticationSmJoiner>(
                'sync-authentication',
                new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith({})).newBuilder(),
                {
                    onAuthenticated: {
                        ifShowingLogin: (mainActions) => mainActions.doShowApp()
                    }
                }, (authenticationSm) => authenticationSm.addListener(['notAuthenticated=>authenticated', {
                    onNotAuthenticated: (actions) => actions.doAuthenticating({})
                }], ListenerType.ONCE))
            .start('main-test2')
    })

});
