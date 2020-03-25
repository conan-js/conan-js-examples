import {StateMachineCoreDefBuilder} from "../../../lib/conan-sm/core/stateMachineCoreDefBuilder";
import {InitializingActions, InitializingListener} from "./stages/initializing.stage";
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
            name: 'showingLogin'
        };
    }
}

class ShowingLoginActionsLogic implements ShowingLoginActions {
    doShowApp(): ShowingAppStage {
        return {
            name: 'showingApp'
        };
    }

}

export class MainSm {
    constructor(
        private readonly initializer: Initializer
    ) {
    }

    define(): SmPrototype<MainSmListener> {
        return new SmPrototype(new StateMachineCoreDefBuilder<MainSmListener>()
            .withDeferredStart<InitializingActions, void>(
                'showingLogin',
                InitializingActionsLogic,
                this.initializer
            )
            .withState<
                ShowingLoginActions,
                ShowingLoginStage
            >('showingLogin', ShowingLoginActionsLogic)
        )}
}
