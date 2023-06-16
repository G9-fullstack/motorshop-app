import { UseFormRegisterReturn } from "react-hook-form";

type InputType = "text" | "email" | "number" | "password" | "tel" | "date" | "url" | "search" | "textarea" | "select";

type InputProps = {
  type?: InputType;
  name: string
  label: string
  placeholder?: string
  register?: UseFormRegisterReturn;
  children?: React.ReactNode
}

export default function Input(props: InputProps) {

  const defaultStyle = "px-4 py-2 text-grey-1 rounded-[4px] border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1 resize-none";

  let inputElement: React.ReactNode;

  switch (props.type) {
  case "textarea":
    inputElement = <textarea name={props.name} id={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label} {...props.register} />;
    break;
  case "select":
    inputElement = <select name={props.name} id={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label}>{props.children}</select>;
    break;
  default:
    inputElement = <input type={props.type} name={props.name} id={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label} {...props.register} />;
    break;
  }

  return (
    <fieldset className="flex flex-col gap-y-2">
      <label htmlFor={props.name} className="input-label">{props.label}</label>
      {inputElement}
    </fieldset>
  );
}
