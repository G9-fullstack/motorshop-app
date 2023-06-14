"use client";

interface ProfileImageProps {
  name: string;
  size: "small" | "big"
}

function getInitials(name: string) {
  const names = name.split(" ");
  if (names.length > 1 && names[1].length > 1) {
    return names[0][0] + names[1][0];
  } else {
    return names[0][0];
  }
}

export default function ProfileImage({ name, size, }: ProfileImageProps) {
  const initials = getInitials(name);

  return (
    <span className={`
      ${size == "big" ? "xl:w-[6.5rem] xl:h-[6.5rem] xl:text-4xl text-3xl w-[4.8125rem] h-[4.8125rem]" : "w-8 h-8 text-sm"} 
       rounded-full flex justify-center items-center font-inter font-medium text-grey-whiteFixed
    `}>
      {initials}
    </span>
  );
}
