"use client";
import { announceComment, announceCommentSchema } from "@/schemas/announce.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSeller } from "@/contexts/SellerContext";
import api from "@/services/api";
import { useParams } from "next/navigation";

interface EditCommentFormProps {
  closeModal: () => void;
  commentId: number,
  comment: string;
}

export default function EditCommentForm({ closeModal, commentId, comment, }: EditCommentFormProps) {
  const { register, handleSubmit, setValue, } = useForm<announceComment>({
    resolver: zodResolver(announceCommentSchema),
  });
  const { getAnnounce, } = useSeller();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    setValue("comment", comment);
  }, []);

  function submitEditComment(formData: announceComment) {
    api.patch(`/announces/${params.id}/comments/${commentId}`, formData)
      .then(() => {
        getAnnounce(params.id);
        toast.success("Comentário atualizado com sucesso");
        closeModal();
      })
      .catch(err => {
        throw err;
      });
  }

  function deleteAnnounce() {
    setConfirmDelete(true);

    setTimeout(() => {
      setConfirmDelete(false);
    }, 2000);

    if (confirmDelete) {
      api.delete(`/announces/${params.id}/comments/${commentId}`)
        .then(() => {
          getAnnounce(params.id);
          toast.success("Comentário excluido com sucesso");
          closeModal();
        })
        .catch(err => {
          throw err;
        });
    }
  }

  return (
    <>
      <Toaster position="top-center" expand={true} />
      <form className="mt-5" onSubmit={handleSubmit(submitEditComment)}>
        <Input
          type="textarea"
          label="Comentário"
          name="editComment"
          placeholder="Digite um comentário..."
          register={register("comment")}
        />
        <fieldset className="flex mt-7 justify-end space-x-2">
          <Button onClick={deleteAnnounce} type="button" style="grey-2" size="big">
            {confirmDelete ? "Confirmar?" : "Excluir Comentário"}
          </Button>
          <Button type="submit" style="brand-3" size="big" >Salvar alterações</Button>
        </fieldset>
      </form>
    </>
  );
}
