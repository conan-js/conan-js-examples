import {StateMachineBuilder, StateMachineBuilder$} from "../../../../core/conan-sm/stateMachineBuilder";
import {SmListener} from "../../../../core/conan-sm/events/stateMachineListeners";
import {State} from "../../../../core/conan-sm/core/state";
import {StateMachineEndpoint} from "../../../../core/conan-sm/core/stateMachineDefBuilder";
import {NextDataListener} from "../../../../core/conan-sm-sugar/store";
import {ReactionType} from "../../../../core/conan-sm/reactions/reactor";

export type InitMainState = State <'initMain'>
export interface InitPaths {
    toShowingLogin (): ShowingLoginState;
}


export type ShowingLoginState = State <'showingLogin'>


export interface MainSmListener extends SmListener{}
export interface MainSmParams {
    translationsStore: StateMachineEndpoint<NextDataListener<any>>
}

export let MainSmBuilder$ : StateMachineBuilder$<MainSmListener, MainSmParams> =
    (params)=>new StateMachineBuilder<MainSmListener>()
        .withState<InitPaths>({
            name: 'initMain',
            reactions: [{
                metadata: {
                    name: '',
                    executionType: ReactionType.ALWAYS
                },
                value: undefined
            }]
        });
