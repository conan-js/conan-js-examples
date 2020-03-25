import {ShowingLoginStage} from "./showingLoginStage";
import {State} from "conan-ui-core";
import {OnEventCallback, SmListener} from "conan-ui-core";

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

