import {defaultTranslations, Translations} from "../../src/domain/translations";
import {MainSm} from "../../src/sm/main/main.sm";
import {expect} from "chai";
import {forkTransition, initSequence} from "./authentication.spec";

describe('main test', () => {
    const TRANSLATIONS: Translations = defaultTranslations;


    // it("should start automatically initializing a state machine", () => {
    //     let sm = new MainSm((actions) => actions.doInitialise(TRANSLATIONS))
    //         .define()
    //         .start('main-test1');
    //
    //     expect(sm.getEvents()).to.deep.eq([
    //         ...initSequence,
    //         forkTransition (
    //             'doInitializing',
    //             undefined,
    //             'initializing',
    //             {
    //                 transitionName: 'doInitialise',
    //                 payload: TRANSLATIONS
    //             }
    //         ),
    //         {stateName: "showingLogin"},
    //     ]);
    //
    // });

    // it("should join with an authentication sm", (done) => {
    //     new MainSm((actions) => actions.doInitialise(TRANSLATIONS)).define()
    //         .addListener(['testMainListener', {
    //             onShowingApp: (_, params) => params.sm.stop(),
    //         }])
    //         .addListener(['stop=>test', {
    //             onStop: (_, params) => {
    //                 expect(params.sm.getEvents()).to.deep.eq(SerializedSmEvents.events(initializationFork));
    //                 done();
    //             }
    //         }])
    //         .sync <AuthenticationSmListener, AuthenticationSmJoiner>(
    //             'sync-authentication',
    //             new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith({})).newBuilder(),
    //             {
    //                 onAuthenticated: {
    //                     ifShowingLogin: (mainActions) => mainActions.doShowApp()
    //                 }
    //             }, (authenticationSm) => authenticationSm.addListener(['notAuthenticated=>authenticated', {
    //                 onNotAuthenticated: (actions) => actions.doAuthenticating({})
    //             }], ListenerType.ONCE))
    //         .start('main-test2')
    // })

});
