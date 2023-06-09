'use client';

interface ProfileImageProps {
  name: string;
}

function getInitials(name: string) {
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + names[1][0];
  } else {
    return names[0][0];
  }
}


export default function ProfileImage({ name }: ProfileImageProps) {
  const initials = getInitials(name);

  return (
    <div className={
      `w-[104px] h-[104px] bg-randomProfile-random11 rounded-full flex justify-center items-center font-inter font-medium text-4xl text-grey-whiteFixed`
    }>
      {initials}
    </div>
  );
}
