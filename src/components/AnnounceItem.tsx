import { useUser } from "@/contexts/UserContext";
import { formatPrice } from "@/utils/formattedPrice";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { announceResponse } from "@/schemas/announce.schema";
import { Modal } from "./Modal";
import { useModal } from "@/hooks/useModal";
import EditAnnounceForm from "./EditAnnounceForm";

type AnnounceItemProps = {
  announce: announceResponse
  children?: React.ReactNode
}

export default function AnnounceItem({ announce, }: AnnounceItemProps) {
  const { user, } = useUser();
  const [ isOpen, openModal, closeModal ] = useModal();
  const isProfile = usePathname().includes("profile");
  const isVisitor = usePathname().match(/profile\/\d+/);
  const router = useRouter();

  if (!announce.isActive) return null;

  return (
    <>
      <li onClick={() => router.push("/announcement/" + announce.id)} className="space-y-6 group w-80 min-w-[20rem] cursor-pointer">
        <div className="w-full h-80 grid content-center place-items-center bg-grey-7 relative border-2 border-transparent group-hover:border-brand-1 transition-all duration-300 ease-in-out">
          {isProfile ?
            <div className={`absolute left-2.5 top-2.5 flex px-2 text-grey-whiteFixed ${announce.isActive ? "bg-brand-1" : "bg-grey-4"} `}>{(announce.isActive ? "Ativo" : "Inativo")}</div>
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
          <Image src={announce.coverImage || ""} alt="Imagem do Carro" className="w-auto" width={310} height={150}/>
        </div>
        <div className="space-y-6">
          <p className="heading-7-600 uppercase overflow-hidden whitespace-nowrap overflow-ellipsis">{announce.model}</p>
          <p className="body-2-400 max-h-[70px] overflow-hidden whitespace-pre-wrap overflow-ellipsis">{announce.description}</p>
          <div className="flex gap-2 items-center">
            <ProfileImage name={announce.seller.name} size="small" userId={announce.seller.id} />
            <span className="body-2-500 overflow-hidden whitespace-nowrap overflow-ellipsis">{announce.seller.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 space-x-4">
              <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">{announce.mileage} KM</span>
              <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">{announce.year}</span>
            </div>
            <span className="heading-7-500">{formatPrice(Number(announce.price))}</span>
          </div>
          {!isVisitor && isProfile && !!user?.isSeller &&
            <div className="flex items-center gap-4">
              <div
                onClick={(e: React.MouseEvent): void => {
                  e.stopPropagation();
                  openModal();
                }}
              >
                <Button style="outline-1" size="medium">Editar</Button>
              </div>

              <Button style="outline-1" size="medium">Ver detalhes</Button>
            </div>}
        </div>
      </li>
      <Modal isOpen={isOpen} onClose={closeModal} modalTitle="Editar anúncio">
        <EditAnnounceForm closeModal={closeModal} announceId={announce.id} announce={announce}/>
      </Modal>
    </>
  );
}
