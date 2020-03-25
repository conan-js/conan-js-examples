import {ShowingAppStage} from "./showingApp.stage";
import {State} from "conan-ui-core";
import {OnEventCallback, SmListener} from "conan-ui-core";

export type ShowingLoginStageName = 'showingLogin';


export interface ShowingLoginActions {
    doShowApp (): ShowingAppStage
}

export interface ShowingLoginActionsListener extends SmListener{
    onDoShowApp?: OnEventCallback<ShowingLoginActions>
}

export interface ShowingLoginListener extends ShowingLoginActionsListener{
    onShowingLogin?: OnEventCallback<ShowingLoginActions>;
}

export interface ShowingLoginJoiner extends SmListener{
    ifShowingLogin?: OnEventCallback<ShowingLoginActions>;

}

export interface ShowingLoginStage extends State<ShowingLoginStageName, ShowingLoginActions>{}

