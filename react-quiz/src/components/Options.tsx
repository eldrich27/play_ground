import type { Questions } from "../types/Questions"

export function Options({ options }: { options: Questions["options"] }) {
    return(
        <div className="options">
            {options.map((option) => (
                <button className="btn btn-option" key={option}>{option}</button>
            ))}
      </div>
    )
}