import {StateMachine} from "../../../lib/conan-sm/stateMachine";
import {
    InitializingActions,
    InitializingListener,
    InitializingStage,
    InitializingStageName
} from "./stages/initializing.stage";
import {Translations} from "../../domain/translations";
import {ShowingLoginActions, ShowingLoginListener, ShowingLoginStage} from "./stages/showingLoginStage";
import {IConsumer} from "../../../lib/conan-utils/typesHelper";
import {ShowingAppListener, ShowingAppStage} from "./stages/showingApp.stage";


export type Initializer = IConsumer<InitializingActions>;

export interface MainSmListener extends InitializingListener, ShowingLoginListener, ShowingAppListener {
}

class InitializingActionsLogic implements InitializingActions {
    doInitialise(translations: Translations): ShowingLoginStage {
        return {
            stateName: 'showingLogin'
        };
    }
}

class ShowingLoginActionsLogic implements ShowingLoginActions {
    doShowApp(): ShowingAppStage {
        return {
            stateName: 'showingApp'
        };
    }

}

export class MainSm {
    constructor(
        private readonly initializer: Initializer
    ) {
    }

    define(): StateMachine<MainSmListener> {
        return new StateMachine([`onStart=>initializing`, {
            onStart: (_, params) => params.sm.requestTransition({
                transition: {
                    stateName: 'initializing'
                },
                transitionName: 'doInitializing'
            })
        }])
            .withDeferredStage<
                InitializingStageName,
                InitializingActions,
                InitializingStage>('initializing', InitializingActionsLogic, this.initializer, ['showingLogin'])
            .withState<
                ShowingLoginActions,
                ShowingLoginStage
            >('showingLogin', ShowingLoginActionsLogic)
    }
}
