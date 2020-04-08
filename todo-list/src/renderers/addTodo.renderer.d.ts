/// <reference types="react" />
import { ToDo } from "../domain/domain";
import { IConsumer } from "conan-ui-core";
interface AddTodoProps {
    onClick: IConsumer<ToDo>;
}
export declare const AddTodo: (props: AddTodoProps) => JSX.Element;
export {};
