import { AnnounceProps } from "@/mock";
import { formatPrice } from "@/utils/formattedPrice";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import frame from "../../public/example-car.png";

type AnnounceItemProps = {
  announce: AnnounceProps
}

const initialName = (name: string) => {
  return name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase();
};

export default function AnnounceItem(props: AnnounceItemProps) {
  return (
    <li className="space-y-6 group w-80 min-w-[20rem]">
      <div className="w-full h-80 bg-contain bg-grey-7 relative border-2 border-transparent group-hover:border-brand-1 transition-all duration-300 ease-in-out">
        <div className="absolute top-0 right-0 flex bg-random-profile-7 py-1 rounded-b-sm rounded-tl-sm">
          <DollarSign color="#fff"/>
        </div>
        <div className="absolute top-0 right-0 flex bg-random-profile-7 py-1 rounded-sm animate-ping">
          <DollarSign color="#fff"/>
        </div>
        <Image src={frame} alt="Car" />
      </div>
      <div className="space-y-6">
        <p className="heading-7-600 uppercase overflow-hidden whitespace-nowrap overflow-ellipsis">{props.announce.model}</p>
        <p className="body-2-400 max-h-[70px] overflow-hidden whitespace-pre-wrap overflow-ellipsis">{props.announce.description}</p>
        <div className="space-x-2">
          <span className="body-2-500 text-white p-2 bg-brand-1 rounded-full">{initialName("Samuel Leão")}</span>
          <span className="body-2-500 overflow-hidden whitespace-nowrap overflow-ellipsis">Samuel Leão</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 space-x-4">
            <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">{props.announce.mileage} KM</span>
            <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">{props.announce.year}</span>
          </div>
          <span className="heading-7-500">{formatPrice(props.announce.price)}</span>
        </div>
      </div>
    </li>
  );
}
