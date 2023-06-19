"use client";
import AnnounceList from "@/components/AnnounceList";
import Button from "@/components/Button";
import FormAnnounceRegister from "@/components/FormAnnounceRegister";
import ListInfo from "@/components/ListInfo";
import { Modal } from "@/components/Modal";
import ProfileImage from "@/components/ProfileImage";
import { useUser } from "@/contexts/UserContext";
import { useModal } from "@/hooks/useModal";
import usePage from "@/hooks/usePage";
import { AnnounceProps, mockAnnounces } from "@/mock";
import { useEffect, useState } from "react";

const PER_PAGE = 12;
const INITIAL_PAGE = 1;

export default function Profile() {
  const { user, } = useUser();
  const [announces, setAnnounces] = useState<AnnounceProps[]>();
  const [page, previousPage, nextPage] = usePage();
  const [isOpen, openModal, closeModal] = useModal();
  const isLogged = !!user;

  useEffect(() => {
    (async function () {
      const startIndex = (page - INITIAL_PAGE) * PER_PAGE;
      const endIndex = page * PER_PAGE;
      setAnnounces(mockAnnounces.slice(startIndex, endIndex));
    })();
  }, [page]);

  if (!isLogged) return null;

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
        <AnnounceList announces={announces} />
      </div>
      <ListInfo page={page} previousPage={previousPage} nextPage={nextPage} />
      <Modal isOpen={isOpen} onClose={closeModal} modalTitle={"Criar anúncio"}>
        <FormAnnounceRegister onClose={closeModal} />
      </Modal>
    </main>
  );
}
