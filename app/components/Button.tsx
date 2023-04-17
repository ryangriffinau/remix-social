import { Props } from "./types";

function Button({ children }: Props) {
    return (
        <button className="transition rounded text-blue-700 font-bold py-4 px-6 transparent hover:bg-gray-100">
        {children}
      </button>
    )
}

export default Button;