import {DiContextFactory} from "conan-js-core";
import {App} from "../../todo-list/src/domain/app";
import {todoListSyncState$} from "./state/todoListSync.state";


export let diContext: App = DiContextFactory.createContext<App>({
        todoListState: todoListSyncState$,
    }
);

