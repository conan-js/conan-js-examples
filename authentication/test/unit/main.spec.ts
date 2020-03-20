import {defaultTranslations, Translations} from "../../src/domain/translations";
import {MainSm, MainSmListener} from "../../src/sm/main/main.sm";
import {expect} from "chai";
import {forkTransition, initSequence} from "./authentication.spec";
import {AuthenticationSm, AuthenticationSmListener} from "../../src/sm/authentication/authentication.sm";
import {Authenticators} from "../utils/authenticators";

describe('main test', () => {
    const TRANSLATIONS: Translations = defaultTranslations;


    it("should start automatically initializing a state machine", () => {
        let sm = new MainSm((actions) => actions.doInitialise(TRANSLATIONS))
            .define()
            .start('main-test1');

        expect(sm.getEvents()).to.deep.eq([
            {stateName: "init"},
            forkTransition (
                'doStart',
                undefined,
                'start',
                {
                    transitionName: 'doInitialise',
                    payload: TRANSLATIONS
                }
            ),
            {stateName: "showingLogin"},
        ]);

    });

    it("should join with an authentication sm", () => {
        let sm = new MainSm((actions) => actions.doInitialise(TRANSLATIONS)).define()
            .sync <AuthenticationSmListener, MainSmListener>(
                'sync-auth-main',
                new AuthenticationSm(Authenticators.alwaysAuthenticatesSuccessfullyWith({})).create(),
                undefined
            )
            .start('main-sync');

        expect(sm.getEvents()).to.deep.eq([
            {stateName: "init"},
            forkTransition (
                'doStart',
                undefined,
                'start',
                {
                    transitionName: 'doInitialise',
                    payload: TRANSLATIONS
                }
            ),
            {stateName: "showingLogin"},
        ]);
    })

});
