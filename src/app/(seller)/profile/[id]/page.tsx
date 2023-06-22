"use client";
import AnnounceList from "@/components/AnnounceList";
import ListInfo from "@/components/ListInfo";
import ProfileImage from "@/components/ProfileImage";
import { useSeller } from "@/contexts/SellerContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserInfoProps = {
  id: number;
  name: string;
  description: string;
  isSeller: boolean;
}

export default function Seller({ params, }: { params: { id: string } }) {
  const [info, setInfo] = useState<UserInfoProps | null>(null);
  const { getAnnouncesSeller, announcesSeller, } = useSeller();

  const router = useRouter();

  useEffect(() => {
    (async function () {
      api.
        get(`/users/${params.id}/infos`)
        .then(({ data, }) => {
          if (!data.isSeller) {
            router.push("/");
          }
          setInfo(data);
        })
        .catch((err) => { console.log(err); });

      getAnnouncesSeller(Number(params.id));
    }
    )();
  }, []);

  const nextPage = () => {
    getAnnouncesSeller(Number(params.id), announcesSeller.nextPage);
  };

  const prevPage = () => {
    getAnnouncesSeller(Number(params.id), announcesSeller.prevPage);
  };

  if (!info) return null;

  return (
    <main className="mt-40">
      <div className="flex flex-col gap-6 m-4 py-10 px-7 md:px-10 rounded bg-grey-10 max-w-7xl mx-auto shadow-xl
      before:absolute before:w-full before:h-80 before:-z-10 before:top-0 before:left-0 before:bg-brand-1">
        <ProfileImage name={info.name} size="big" userId={+info.id}></ProfileImage>
        <div>
          <span className="heading-6-600">{info.name}</span>
          <span className="bg-brand-4 py-1 px-2 body-2-500 text-brand-1">Anunciante</span>
        </div>
        <p className="body-1-400 text-grey-2">{info.description}</p>
      </div>
      <div className="ml-3 px-3 md:mx-auto max-w-screen-2xl my-16">
        <AnnounceList announces={announcesSeller.data} />
      </div>
      <ListInfo announces={announcesSeller.data} nextPage={nextPage} prevPage={prevPage} currentPage={announcesSeller.currentPage} totalCount={announcesSeller.totalCount} />
    </main>
  );
}
