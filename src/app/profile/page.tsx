"use client";
import AnnounceList from "@/components/AnnounceList";
import Button from "@/components/Button";
import FormAnnounceRegister from "@/components/FormAnnounceRegister";
import ListInfo from "@/components/ListInfo";
import { Modal } from "@/components/Modal";
import PlaceholderItem from "@/components/PlaceholderItem";
import ProfileImage from "@/components/ProfileImage";
import { useSeller } from "@/contexts/SellerContext";
import { useUser } from "@/contexts/UserContext";
import { useModal } from "@/hooks/useModal";
import { useEffect } from "react";

export default function Profile() {
  const { user, } = useUser();
  const { getAnnouncesSeller, announcesSeller, loading, } = useSeller();
  const [isOpen, openModal, closeModal] = useModal();
  const [isOpenNotify, openNotifyModal, closeNotifyModal] = useModal();

  useEffect(() => {
    if (user) {
      getAnnouncesSeller(Number(user.id));
    }
  }, [user]);

  if (!user) return null;

  return (
    <main className="mt-40">
      <div className="flex flex-col gap-6 m-4 py-10 px-7 md:px-10 rounded bg-grey-10 max-w-7xl mx-auto shadow-xl
      before:absolute before:w-full before:h-80 before:-z-10 before:top-0 before:left-0 before:bg-brand-1">
        <ProfileImage name={user.name} size="big" userId={+user.id}></ProfileImage>
        <div>
          <span className="heading-6-600">{user.name}</span>
          <span className="bg-brand-4 py-1 px-2 body-2-500 text-brand-1">Anunciante</span>
        </div>
        <p className="body-1-400 text-grey-2">{user.description}</p>
        {user.isSeller && <Button onClick={openModal} type="button" style="outline-brand-1" size="big" details="w-max">Criar anuncio</Button >}
      </div>
      <div className="ml-3 px-3 md:mx-auto max-w-screen-2xl my-16">
        {loading
          ? [...Array(12)].map(() => <PlaceholderItem key={Math.random()} />)
          : announcesSeller.data.length ? <AnnounceList announces={announcesSeller.data} />
            : (<div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="font-lexend font-bold text-center text-brand-3 text-3xl">
                Nenhum anúncio cadastrado
              </h1>
            </div>)
        }
      </div>
      <ListInfo
        announces={announcesSeller.data}
        prevPage={() => getAnnouncesSeller(Number(user.id), announcesSeller.prevPage)}
        nextPage={() => getAnnouncesSeller(Number(user.id), announcesSeller.nextPage)}
        currentPage={announcesSeller.currentPage}
        totalPages={announcesSeller.totalPages}
      />
      <Modal isOpen={isOpen} onClose={closeModal} modalTitle={"Criar anúncio"}>
        <FormAnnounceRegister onClose={closeModal} openNotifyModal={openNotifyModal} />
      </Modal>
      <Modal isOpen={isOpenNotify} onClose={closeNotifyModal} modalTitle="Sucesso!">
        <h4 className="mt-7 font-lexend font-medium text-base text-grey-1 mb-5">Seu anúncio foi criado com sucesso!</h4>
        <p className="font-inter font-normal text-base text-grey-2">Agora você poderá ver seus negócios crescendo em grande escala</p>
      </Modal>
    </main>
  );
}
