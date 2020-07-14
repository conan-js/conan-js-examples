import * as React from "react";
import {Remarkable} from 'remarkable';

interface MarkDownProps {
    text: string
}

export const Markdown = ({text}: MarkDownProps) => {
    const md = new Remarkable();
    return <div dangerouslySetInnerHTML={{__html: md.render(text)}}/>;
}
