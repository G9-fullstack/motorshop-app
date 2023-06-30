import { Controller, FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IMaskInput } from "react-imask";

type InputType = "text" | "email" | "number" | "password" | "tel" | "date" | "cpf" | "cep" | "url" | "search" | "textarea" | "select";

type InputProps = {
  type?: InputType;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  children?: React.ReactNode;
  errors?: FieldError;
  disabled?: boolean;
}

export default function Input(props: InputProps) {

  const defaultStyle = "px-4 py-2 text-grey-1 rounded-[4px] border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1 resize-none";

  let inputElement: React.ReactNode;

  switch (props.type) {
  case "textarea":
    inputElement = <textarea disabled={props.disabled} name={props.name} id={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label} {...props.register} />;
    break;
  case "select":
    inputElement = <select value={props.value} disabled={props.disabled} name={props.name} id={props.name} className={`${defaultStyle} capitalize`} placeholder={props.placeholder ?? props.label} {...props.register}>{props.children}</select>;
    break;
  case "tel":
    inputElement =
        <Controller
          name={props.name}
          control={props.control}
          render={({ field, }) => (
            <IMaskInput
              mask="(00) 00000-0000"
              type={props.type}
              disabled={props.disabled}
              id={props.name}
              className={defaultStyle}
              placeholder={props.placeholder ?? props.label}
              {...field}
            />
          )}
        />;
    break;
  case "cpf":
    inputElement =
        <Controller
          name={props.name}
          control={props.control}
          render={({ field, }) => (
            <IMaskInput
              mask="000.000.000-00"
              type="text"
              disabled={props.disabled}
              id={props.name}
              className={defaultStyle}
              placeholder={props.placeholder ?? props.label}
              {...field}
            />
          )}
        />;
    break;
  case "cep":
    inputElement =
        <Controller
          name={props.name}
          control={props.control}
          render={({ field, }) => (
            <IMaskInput
              mask="00000-000"
              type="text"
              disabled={props.disabled}
              id={props.name}
              className={defaultStyle}
              placeholder={props.placeholder ?? props.label}
              {...field}
            />
          )}
        />;
    break;
  default:
    inputElement = <input disabled={props.disabled} type={props.type} name={props.name} id={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label} {...props.register} />;
    break;
  }

  return (
    <fieldset className="flex flex-col gap-y-2">
      <label htmlFor={props.name} className="input-label">{props.label}</label>
      {inputElement}
      {props.errors && <span className="text-red-500 text-sm">{props.errors.message}</span>}
    </fieldset>
  );
}
