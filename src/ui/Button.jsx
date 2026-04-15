import { Link } from "react-router-dom";

function Button({ children, size, type, className, link = "", ...props }) {
  if (link)
    return (
      <Link
        to={link}
        className={`${type === "secondary" ? "bg-tetiary" : "bg-primary"} ${size === "sm" ? "py-2.5 px-4 text-sm" : "px-5 py-4"} rounded-full text-white font-semibold cursor-pointer transition-all duration-500 ${className}`}>
        {children}
      </Link>
    );

  // size: sm, default
  // type: sec, default
  return (
    <button
      {...props}
      className={`${type === "secondary" ? "bg-tetiary" : "bg-primary"} ${size === "sm" ? "py-2.5 px-4 text-sm" : "px-5 py-4"} rounded-full text-white font-semibold cursor-pointer transition-all duration-500 ${className}`}>
      {children}
    </button>
  );
}

export default Button;
