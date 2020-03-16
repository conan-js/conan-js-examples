import {StateMachineTreeDefBuilder} from "../../../lib/conan-sm/stateMachineTreeDefBuilder";
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
import {SmPrototype} from "../../../lib/conan-sm-sugar/smPrototype";


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

    define(): SmPrototype<MainSmListener> {
        return new SmPrototype(new StateMachineTreeDefBuilder<MainSmListener>([`onStart=>initializing`, {
            onStart: (_: any, params: any) => params.sm.requestTransition({
                transition: {
                    stateName: 'initializing'
                },
                transitionName: 'doInitializing'
            } as any)
        }])
            .withDeferredStage<
                InitializingStageName,
                InitializingActions,
                InitializingStage>('initializing', InitializingActionsLogic, this.initializer, ['showingLogin'])
            .withState<
                ShowingLoginActions,
                ShowingLoginStage
            >('showingLogin', ShowingLoginActionsLogic)
        )}
}
