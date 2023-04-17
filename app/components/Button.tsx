import { Props } from "./types";

// the children prop is required because the button will be used to wrap other elements
// the ...props is required to pass all the other props to the button element e.g. type, onClick, etc.
function Button({ children, ...props }: Props) {
    return (
        <button className="transition rounded text-blue-700 font-bold py-4 px-6 transparent hover:bg-gray-100" {...props}>
        {children}
      </button>
    )
}

export default Button;