import { announceComment } from "@/schemas/announce.schema";
import ProfileImage from "./ProfileImage";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useUser } from "@/contexts/UserContext";
import { useSeller } from "@/contexts/SellerContext";

type CommentFormProps = {
  announceId: number;
};

export default function CommentForm({ announceId, }: CommentFormProps) {
  const { user, } = useUser();
  const { getAnnounce, } = useSeller();
  const { register, handleSubmit, reset, } = useForm<announceComment>({});

  function submitForm(formData: announceComment) {
    api
      .post(`/announces/${announceId}/comments`, formData)
      .then(() => {
        getAnnounce(String(announceId));
      })
      .catch((err) => {
        throw err;
      });
    reset();
  }

  return (
    <div className="w-full bg-grey-10 py-9 px-11 rounded">
      <div className="flex items-center gap-2 mb-4">
        <ProfileImage
          name={user?.name || "User"}
          size="small"
          userId={+user?.id || 1}
        />
        <span className="text-sm font-medium font-inter text-grey-0">
          {user?.name}
        </span>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="relative">
          <textarea
            placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
            className="w-full h-32 py-5 text-base font-normal border-2 rounded outline-none resize-none border-grey-7 px-7 font-inter text-grey-3 decoration-transparent"
            {...register("comment")}
          ></textarea>
          <button
            type="submit"
            className="absolute z-10 px-5 py-3 text-sm font-semibold rounded right-3 bottom-4 bg-brand-1 text-grey-whiteFixed"
          >
            Comentar
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-3 bg-grey-7 cursor-pointer hover:bg-grey-6/80">
          Gostei muito!
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-3 bg-grey-7 cursor-pointer hover:bg-grey-6/80">
          Incrível
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-3 bg-grey-7 cursor-pointer hover:bg-grey-6/80">
          Recomendarei para meus amigos!
        </span>
      </div>
    </div>
  );
}
