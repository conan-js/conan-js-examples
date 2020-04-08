import {Translations} from "../domain/translations";
import {Resource} from "../../../../core/conan-resource/resource";
import {Asap} from "../../../../core/conan-utils/asap";
import {StateLogic} from "../../../../core/conan-sm/reactions/reactorFactory";
import {SimpleActions} from "../../../../core/conan-sm-sugar/store";

export class TranslationsService implements StateLogic<SimpleActions<Translations>>{
    constructor(
        private readonly translationsResource: Resource<Translations>
    ) {}

    update(): Asap<Translations>  {
        return this.translationsResource.get();
    }
}
