
type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit"
  style?: "grey-1" | "grey-2" | "negative" | "success" | "disable" | "brand-1" | "brand-3" | "brand-4" | "outline-brand-1" | "link" | "alert" | "brand-opacity" | "light" | "outline-light" | "outline-1" | "outline-2" | undefined;
  width?: number;
  details?: string
  size?: "big" | "medium" | undefined;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {

  const size = () => {
    switch (props.size) {
    case "big":
      return "px-7 button-big-text";
    case "medium":
      return "px-5 button-medium-text";
    default:
      return "px-7 button-big-text";
    }
  };

  const style = () => {
    switch (props.style) {
    case "grey-1":
      return "bg-grey-0 border-grey-0 hover:bg-grey-1 hover:border-grey-1 ";
    case "grey-2":
      return "text-grey-0 bg-grey-5 border-grey-5 hover:text-grey-whiteFixed hover:bg-grey-2 hover:border-grey-2 ";
    case "negative":
      return "text-grey-2 bg-grey-6 border-grey-6 hover:bg-grey-5 hover:border-grey-5";
    case "disable":
      return "bg-grey-5 border-grey-5";
    case "brand-1":
      return "bg-brand-1 border-brand-1 hover:border-brand-2 hover:bg-brand-2";
    case "brand-opacity":
      return "text-brand-4 bg-brand-4 border-brand-4";
    case "light":
      return "text-grey-1 bg-grey-10 border-grey-10";
    case "outline-light":
      return "text-grey-10 bg-white border-grey-10 hover:text-grey-1 hover:bg-grey-10";
    case "outline-1":
      return "text-grey-0 bg-white border-grey-0 hover:text-grey-10 hover:bg-grey-1 border-grey-1";
    case "outline-2":
      return "text-grey-0 bg-white border-grey-4 hover:text-grey-10 hover:bg-grey-1 hover:border-grey-1";
    case "outline-brand-1":
      return "text-brand-1 bg-white border-brand-1 hover:bg-brand-4";
    case "link":
      return "text-grey-0 bg-white border-white hover:text-grey-10 hover:bg-grey-1 hover:bg-grey-8 hover:border-grey-8";
    case "alert":
      return "text-feedback-alert-1 bg-feedback-alert-3 border-feedback-alert-3 hover:bg-feedback-alert-3 hover:border-feedback-alert-3";
    case "success":
      return "text-feedback-success-1 bg-feedback-success-3 border-feedback-success-3 hover:bg-feedback-success-3 hover:border-feedback-success-3";
    case "brand-3":
      return "text-brand-4 bg-brand-3 border-brand-3 hover:bg-brand-2 hover:border-brand-2";
    case "brand-4":
      return "text-random-profile-4 bg-brand-4 border-brand-4 hover:text-brand-4 hover:bg-brand-2 hover:border-brand-2";
    default:
      return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    }
  };

  return (
    <button onClick={props.onClick} type={props.type} className={`border rounded py-3 ${size()} ${style()} ${props.details} transition-all duration-300 ease-in-out`} style={{ width: props.width, }}>
      {props.children}
    </button>
  );
}
