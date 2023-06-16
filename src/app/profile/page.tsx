"use client";
import AnnounceList from "@/components/AnnounceList";
import Button from "@/components/Button";
import ListInfo from "@/components/ListInfo";
import usePage from "@/hooks/usePage";
import { Modal } from "@/components/Modal";
import { AnnounceProps, mockAnnounces } from "@/mock";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import FormAnnounceRegister from "@/components/FormAnnounceRegister";

const PER_PAGE = 12;
const INITIAL_PAGE = 1;

export default function Profile() {
  const [announces, setAnnounces] = useState<AnnounceProps[]>();
  const [page, previousPage, nextPage] = usePage();
  const [isOpen, openModal, closeModal] = useModal();
  useEffect(() => {
    (async function () {
      const startIndex = (page - INITIAL_PAGE) * PER_PAGE;
      const endIndex = page * PER_PAGE;
      setAnnounces(mockAnnounces.slice(startIndex, endIndex));
    })();
  }, [page]);

  const initialName = (name: string) => {
    return name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase();
  };

  return (
    <main className="mt-40">
      <div className="flex flex-col gap-6 m-4 py-10 px-7 md:px-10 rounded bg-grey-10 max-w-7xl mx-auto shadow-xl
      before:absolute before:w-full before:h-80 before:-z-10 before:top-0 before:left-0 before:bg-brand-1">
        <span className="text-white text-4xl font-inter bg-brand-1 rounded-full p-7 w-max">{initialName("Samuel Leão")}</span>
        <div>
          <span className="heading-6-600">Samuel Leão</span>
          <span className="bg-brand-4 py-1 px-2 body-2-500 text-brand-1">Anunciante</span>
        </div>
        <p className="body-1-400 text-grey-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, corporis sit. Ipsam, ex nobis unde distinctio accusamus, earum alias dicta maiores qui aut, deleniti consectetur fuga corporis fugit modi ipsa!</p>
        <Button onClick={openModal} type="button" style="outline-brand-1" size="big" details="w-max">Criar anuncio</Button >
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
