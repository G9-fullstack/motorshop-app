import { Dot, Edit } from "lucide-react";
import ProfileImage from "./ProfileImage";
import { announceResponse, commentData } from "../schemas/announce.schema";
import { formatDistanceToNow, isThisMonth, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUser } from "@/contexts/UserContext";
import { useModal } from "@/hooks/useModal";
import { Modal } from "./Modal";
import EditCommentForm from "./EditCommentForm";
import { useState } from "react";

type iAnnounceDetail = {
  announcementComents: announceResponse["comments"];
};

export default function Comments({ announcementComents, }: iAnnounceDetail) {
  const {user,} = useUser();
  const [ isOpen, openModal, closeModal ] = useModal();
  const [selectedComment, setSelectedComment] = useState<commentData | null>(null);

  const formatDate = (dateString: string) => {
    const currentDate = new Date();
    const date = parseISO(dateString);

    if (isToday(date) && currentDate.getDate() === date.getDate()) {
      return "Hoje";
    } else if (isThisMonth(date)) {
      const distanceToNow = formatDistanceToNow(date, { locale: ptBR, });
      return `Há ${distanceToNow}`;
    } else if (currentDate.getFullYear() === date.getFullYear()) {
      const distanceToNow = formatDistanceToNow(date, { locale: ptBR, });
      return `Há ${distanceToNow}`;
    } else {
      const distanceToNow = formatDistanceToNow(date, { locale: ptBR, });
      return `Há ${distanceToNow}`;
    }
  };

  return (
    <section className="bg-grey-10 py-9 px-11 w-full rounded">
      <h3 className="mb-6 text-xl font-semibold font-lexend text-grey-1">
        Comentários
      </h3>
      <ul className="space-y-11">
        {announcementComents.length ? (
          announcementComents.map((comment, index) => (
            <li key={index}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mb-3">
                  <ProfileImage
                    name={comment.user.name}
                    size="small"
                    userId={comment.user.id}
                  />
                  <span className="text-sm font-medium font-inter text-grey-0">
                    {comment.user.name}
                  </span>
                  <Dot className="text-grey-3" />
                  <span className="text-xs font-normal font-inter text-grey-3">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                {user && +user.id === comment.user.id &&
                  <span
                    onClick={() => {
                      setSelectedComment(comment);
                      openModal();
                    }}
                    className="cursor-pointer mb-3 text-grey-3 p-2 rounded-full hover:bg-grey-8 transition duration-300">
                    <Edit size={18} />
                  </span>}
              </div>
              <p className="text-sm font-normal text-grey-2 font-inter">
                {comment.comment}
              </p>
            </li>
          ))
        ) : (
          <li>
            <p className="text-sm font-normal text-grey-2 font-inter">
              Escreva o primeiro comentário.
            </p>
          </li>
        )}
      </ul>
      {selectedComment && <Modal isOpen={isOpen} onClose={closeModal} modalTitle="Editar comentário">
        <EditCommentForm closeModal={closeModal} commentId={selectedComment.id} comment={selectedComment.comment} />
      </Modal>}
    </section>
  );
}
