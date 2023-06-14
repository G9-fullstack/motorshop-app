import { AnnounceProps } from "@/mock"
import { formatPrice } from "@/utils/formattedPrice"
import { DollarSign } from "lucide-react"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import frame from "../../public/example-car.png"
import Button from "./Button"
import ProfileImage from "./ProfileImage"

type AnnounceItemProps = {
  announce: AnnounceProps
  children?: React.ReactNode
}

export default function AnnounceItem(props: AnnounceItemProps) {
  const isProfile = usePathname().includes("profile")

  return (
    <li className="space-y-6 group w-80 min-w-[20rem]">
      <div className="w-full h-80 bg-contain bg-grey-7 relative border-2 border-transparent group-hover:border-brand-1 transition-all duration-300 ease-in-out">
        {isProfile ?
          <div className={`absolute left-2.5 top-2.5 flex px-2 text-grey-whiteFixed ${props.announce.isActive ? "bg-brand-1" : "bg-grey-4"} `}>{(props.announce.isActive ? "Ativo" : "Inativo")}</div>
          :
          <div>
            <div className="absolute top-0 right-0 flex bg-random-profile-7 py-1 rounded-b-sm rounded-tl-sm">
              <DollarSign color="#fff" />
            </div>
            <div className="absolute top-0 right-0 flex bg-random-profile-7 py-1 rounded-sm animate-ping">
              <DollarSign color="#fff" />
            </div>
          </div>
        }
        <Image src={frame} alt="Car" />
      </div>
      <div className="space-y-6">
        <p className="heading-7-600 uppercase overflow-hidden whitespace-nowrap overflow-ellipsis">{props.announce.model}</p>
        <p className="body-2-400 max-h-[70px] overflow-hidden whitespace-pre-wrap overflow-ellipsis">{props.announce.description}</p>
        <div className="flex gap-2 items-center">
          <ProfileImage name="Samuel Leão" size="small" userId={10} />
          <span className="body-2-500 overflow-hidden whitespace-nowrap overflow-ellipsis">Samuel Leão</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 space-x-4">
            <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">{props.announce.mileage} KM</span>
            <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">{props.announce.year}</span>
          </div>
          <span className="heading-7-500">{formatPrice(props.announce.price)}</span>
        </div>
        {isProfile &&
          <div className="flex items-center gap-4">
            <Button style="outline-1" size="medium">Editar</Button>
            <Button style="outline-1" size="medium">Ver detalhes</Button>
          </div>}
      </div>
    </li>
  );
}
