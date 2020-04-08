/// <reference types="react" />
import { ICallback } from "conan-ui-core";
interface TodoProps {
    onClick: ICallback;
    completed: boolean;
    text: string;
}
export declare const Todo: (props: TodoProps) => JSX.Element;
export {};
