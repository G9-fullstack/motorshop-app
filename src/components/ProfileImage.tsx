"use client";

interface ProfileImageProps {
  name: string;
  size: "small" | "big"
  userId: number;
}

function getInitials(name: string) {
  const names = name.split(" ");
  if (names.length > 1 && names[1].length > 1) {
    return names[0][0] + names[1][0];
  } else {
    return names[0][0];
  }
}

const getProfileColor = (userId: number) => {
  const profileColors = [
    "#E34D8C",
    "#C04277",
    "#7D2A4D",
    "#7000FF",
    "#6200E3",
    "#36007D",
    "#349974",
    "#2A7D5F",
    "#153D2E",
    "#6100FF",
    "#5700E3",
    "#30007D"
  ];
  return profileColors[(userId - 1) % profileColors.length];
};


export default function ProfileImage({ name, size, userId, }: ProfileImageProps) {
  const initials = getInitials(name);
  const profileColor = getProfileColor(userId);

  return (
    <span
      style={{ backgroundColor: profileColor, }}
      className={`
      ${size == "big" ? "xl:w-[6.5rem] xl:h-[6.5rem] xl:text-4xl text-3xl w-[4.8125rem] h-[4.8125rem]" : "w-8 h-8 text-sm"} 
      rounded-full flex justify-center items-center font-inter font-medium text-grey-whiteFixed
    `}>
      {initials}
    </span>
  );
}
