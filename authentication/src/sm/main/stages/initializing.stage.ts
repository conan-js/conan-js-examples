import {ShowingLoginStage} from "./showingLoginStage";
import {Translations} from "../../../domain/translations";
import {State} from "conan-ui-core";
import {OnEventCallback, SmListener} from "conan-ui-core";

export type InitializingStageName = 'initializing';

export interface InitializingActions {
    doInitialise (translations: Translations): ShowingLoginStage
}

export interface InitializingActionsListener extends SmListener{
    onDoInitialise?: OnEventCallback<InitializingActions>
}

export interface InitializingListener extends InitializingActionsListener{
    onInitializing?: OnEventCallback<InitializingActions>;
}

export interface InitializingStage extends State <InitializingStageName, InitializingActions> {}
