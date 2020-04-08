import {AutoStart, SimpleStore, StoreBuilderFactory} from "../../../../core/conan-sm-sugar/store";
import {Translations} from "../domain/translations";
import {TranslationsService} from "../services/translations.service";

export let TranslationsStore$ = (name: string, translationsService: TranslationsService)=>
    StoreBuilderFactory.simple<Translations, AutoStart>(
        {
            deferrer: translationsService,
            starter:()=>translationsService.update()
        }
    ).build(name) as SimpleStore<Translations, AutoStart>;
