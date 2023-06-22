import Link from "next/link";
import ProfileImage from "./ProfileImage";

interface iCardUserProfile {
	sellerId: number;
	sellerName: string;
	sellerDescription: string;
}

export default function CardUserProfile({ sellerId, sellerName, sellerDescription, }: iCardUserProfile) {
  return (
    <div className="rounded bg-grey-10 md:w-[440px] h-[426px] flex flex-col items-center justify-center p-11">
      <ProfileImage name={sellerName} size="big" userId={sellerId} />
      <span className="mb-8 text-xl font-semibold mt-7 text-grey-1 font-lexend">{sellerName}</span>
      <p className="mb-8 text-base font-normal text-center font-inter text-grey-2">
        {sellerDescription}
      </p>
      <Link href={`/profile/${sellerId}`} className="py-3 text-base font-semibold rounded px-7 bg-grey-0 text-grey-whiteFixed font-inter">Ver todos anuncios</Link>
    </div>
  );
}
