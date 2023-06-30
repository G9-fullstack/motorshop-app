import { useSeller } from "@/contexts/SellerContext";
import { formatPrice } from "@/utils/formattedPrice";
import Image from "next/image";
import CardUserProfile from "./CardUserProfile";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

export default function AnnounceDetail() {
  const { announce, } = useSeller();

  if (!announce) return null;

  return (
    <>
      <div className="lg:flex mt-9 lg:gap-14 lg:justify-center">
        <div className="max-w-[750px] w-full">
          <div className="w-full mb-5">
            <figure className="bg-grey-10 w-full h-[22rem] rounded grid content-center overflow-hidden">
              <Image
                className="w-full"
                src={announce.coverImage || ""}
                alt="Imagem do Carro"
                priority
                width={290}
                height={250}
              />
            </figure>
          </div>

          <section className="bg-grey-10 rounded w-full py-9 px-7 mb-9">
            <h2 className="font-semibold text-xl mb-8">{announce.model}</h2>
            <div className="md:flex items-center justify-between">
              <div>
                <span className="bg-brand-4 text-brand-1 rounded font-inter font-medium text-sm py-1 px-2 mr-3">
                  {announce.year}
                </span>
                <span className="bg-brand-4 text-brand-1 rounded font-inter font-medium text-sm py-1 px-2">
                  0 KM
                </span>
              </div>
              <small className="text-grey-01 text-base font-medium block mt-8 md:mt-0">
                {formatPrice(Number(announce.price))}
              </small>
            </div>
            <button className="bg-brand-1 text-grey-whiteFixed rounded text-sm w-24 h-9 mt-7">
              Comprar
            </button>
          </section>

          <section className="bg-grey-10 rounded w-full py-9 px-7">
            <h3 className="font-semibold text-xl mb-8">Descrição</h3>
            <p className="font-inter text-grey-2">{announce.description}</p>
          </section>
        </div>

        <div className="flex flex-col gap-9 md:max-w-[440px]">
          <section className="bg-grey-10 rounded w-full p-9 mt-4 lg:mt-0">
            <h3 className="font-semibold text-xl mb-8">Fotos</h3>
            <ul className="grid grid-cols-3 gap-x-1 gap-y-12">
              {announce.images.map((image, index) => (
                <li key={index}>
                  <figure className="bg-grey-8 rounded w-[5rem] h-[5rem] grid place-items-center overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt="Imagem do Carro"
                      className="w-full h-auto"
                      width={70}
                      height={50}
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </section>

          <CardUserProfile
            sellerId={announce.sellerId}
            sellerName={announce.seller.name}
            sellerDescription={announce.seller.description}
          />
        </div>
      </div>

      <div className="lg:flex lg:gap-14 lg:justify-center w-full mt-4 space-y-9 lg:mr-[380px] xl:mr-[470px] 2xl:mr-[557px]">
        <div className="max-w-[750px] w-full">
          <Comments announcementComents={announce.comments} />
          <CommentForm
            announceId={announce.id}
          />
        </div>
        <div className="max-w-[440px] w-full" />
      </div>
    </>
  );
}
