import {ShowingLoginStage} from "./showingLoginStage";
import {State} from "../../../../lib/conan-sm/core/state";
import {OnEventCallback, SmListener} from "../../../../lib/conan-sm/core/stateMachineListeners";

export type ShowingAppStageName = 'showingApp';

export interface ShowingAppActions {
    doShowLogin (): ShowingLoginStage;
}

export interface ShowingAppActionsListener extends SmListener{
    onDoLogout?: OnEventCallback<ShowingAppActions>
}

export interface ShowingAppListener extends ShowingAppActionsListener{
    onShowingApp?: OnEventCallback<ShowingAppActions>;
}

export interface ShowingAppJoiner extends SmListener{
    ifShowingApp?: OnEventCallback<ShowingAppActions>;
}

export interface ShowingAppStage extends State<ShowingAppStageName, ShowingAppActions>{}

