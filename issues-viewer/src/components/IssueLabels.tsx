import * as React from "react";
import {Label} from "../api/gitHub";

interface IssueLabelsProps {
  labels: Label[]
  className?: string
}

export const IssueLabels = ({labels, className}: IssueLabelsProps) => (
    <>
      {labels.map(label => (
          <span
              key={label.id}
              className="issue__label"
              style={{
                boxShadow: `0 0 2px #${label.color}`,
                borderColor: `#${label.color}`
              }}
          >
        {label.name}
      </span>
      ))}
    </>
)
