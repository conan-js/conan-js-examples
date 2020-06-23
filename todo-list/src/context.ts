import {DiContextFactory} from "conan-js-core";
import {todoListSyncState$} from "./state/todoListSync.state";
import {App} from "./domain/domain";


export let diContext: App = DiContextFactory.createContext<App>({
        todoListState: todoListSyncState$,
    }
);

