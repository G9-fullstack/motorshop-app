
type InputProps = {
  type?: "text" | "textarea" | "select"
  name: string
  label: string
  placeholder?: string
  children?: React.ReactNode
}

export default function Input(props: InputProps) {

  const defaultStyle = "px-4 py-2 text-grey-1 rounded-[4px] border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"

  let inputElement: React.ReactNode;

  switch (props.type) {
    case "textarea":
      inputElement = <textarea name={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label} />
      break;
    case "select":
      inputElement = <select name={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label}>{props.children}</select>
      break;
    default:
      inputElement = <input type="text" name={props.name} className={defaultStyle} placeholder={props.placeholder ?? props.label} />
      break;
  }

  return (
    <fieldset className="flex flex-col gap-y-2">
      <label htmlFor={props.name} className="input-label">{props.label}</label>
      {inputElement}
    </fieldset>
  )
}