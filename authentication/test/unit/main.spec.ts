import {expect} from "chai";
import {SerializedSmEvents} from "../../../../conan-ui-core/src/test/utils/serializedSmEvents";
import {defaultTranslations, Translations} from "../../../../conan-ui-core/src/main/domain/translations";
import {Authenticators} from "../../../../conan-ui-core/src/test/utils/authenticators";
import {MainSm} from "../../../../conan-ui-core/src/main/sm/main/main.sm";
import {
    AuthenticationPrototype,
    AuthenticationSmJoiner,
    AuthenticationSmListener
} from "../../../../conan-ui-core/src/main/sm/authentication/authentication.sm";
import {ListenerType} from "../../../../conan-ui-core/src/lib/conan-sm/stateMachineListeners";

describe('test', () => {
    const TRANSLATIONS: Translations = defaultTranslations;

    let initializationFork = SerializedSmEvents.fork({
        stageName: 'start',
    }, {
        stageName: 'initializing',
    }, SerializedSmEvents.stageAction(
        'initializing',
        'doTranslationsFetched',
        TRANSLATIONS,
        'showingLogin'
    ));


    it("should start automatically initializing a state machine", (done) => {
        new MainSm((actions) => actions.doInitialise(TRANSLATIONS)).define()
            .addListener(['testMainListener', {
                onShowingLogin: (_, params) => params.sm.stop(),
            }], ListenerType.ALWAYS)
            .addListener(['stop=>test', {
                onStop: (_, params) => {
                    expect(params.sm.getEvents()).to.deep.eq([
                            {
                                eventName: 'onStart',
                                stageName: 'start',
                                fork: [{
                                    eventName: 'onStart',
                                    stageName: 'start',
                                }, {
                                    eventName: 'onInitializing',
                                    stageName: 'initializing',
                                }, {
                                    eventName: 'onDoInitialise',
                                    stageName: 'initializing',
                                    payload: TRANSLATIONS
                                }, {
                                    eventName: 'onStop',
                                    stageName: 'stop',
                                }
                                ],
                            },
                            {
                                eventName: 'onShowingLogin',
                                stageName: 'showingLogin',
                            },
                            {
                                eventName: 'onStop',
                                stageName: 'stop',
                            },
                        ]
                    );
                    done();
                }
            }], ListenerType.ONCE)
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
