import {defaultTranslations, Translations} from "../../src/domain/translations";
import {MainSm} from "../../src/sm/main/main.sm";
import {expect} from "chai";
import {forkTransition, initSequence} from "./authentication.spec";

describe('main test', () => {
    const TRANSLATIONS: Translations = defaultTranslations;


    it("should start automatically initializing a state machine", () => {
        let sm = new MainSm((actions) => actions.doInitialise(TRANSLATIONS))
            .define()
            .start('main-test1');

        expect(sm.getEvents()).to.deep.eq([
            ...initSequence,
            forkTransition (
                'doInitializing',
                undefined,
                'initializing',
                {
                    transitionName: 'doInitialise',
                    payload: TRANSLATIONS
                }
            ),
            {stateName: "showingLogin"},
        ]);

    });

    it("should join with an authentication sm", () => {
        // let sm = new MainSm((actions) => actions.doInitialise(TRANSLATIONS)).define()
        //     .sync <AuthenticationSmListener, MainSmListener>(
        //         'sync-authentication',
        //         new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith({})).newBuilder()
        //             .addListener(['notAuthenticated=>authenticated', {
        //                 onNotAuthenticated: (actions) => actions.doAuthenticating({})
        //             }])
        //         ,
        //         {
        //             onAuthenticated: {
        //                 onShowingLogin: (mainActions) => mainActions.doShowApp()
        //             }
        //         }
        //     )
        //     .start('main-sync');
        //
        // expect(sm.getEvents()).to.deep.eq([
        //     ...initSequence,
        //     forkTransition (
        //         'doInitializing',
        //         undefined,
        //         'initializing',
        //         {
        //             transitionName: 'doInitialise',
        //             payload: TRANSLATIONS
        //         }
        //     ),
        //     {stateName: "showingLogin"},
        // ]);
    })

});
