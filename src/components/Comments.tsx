import { Dot } from "lucide-react";
import ProfileImage from "./ProfileImage";
import { announceResponse } from "../schemas/announce.schema";
import { formatDistanceToNow, isThisMonth, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

type iAnnounceDetail = {
  announcementComents: announceResponse["comments"]
}

export default function Comments({announcementComents,}:iAnnounceDetail) {

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
      console.log(distanceToNow);
      return `Há ${distanceToNow}`;
    } else {
      const distanceToNow = formatDistanceToNow(date, { locale: ptBR, });
      console.log(distanceToNow);
      return `Há ${distanceToNow}`;
    }
  };

  function convertToNumber(string: string): number {
    const asciiArray = Array.from(string).map((char) => char.charCodeAt(0));
    const asciiNumber = parseInt(asciiArray.join(""));
    return asciiNumber;
  }

  return (
    <section className="bg-grey-10 py-9 px-11 w-full rounded">
      <h3 className="mb-6 text-xl font-semibold font-lexend text-grey-1">Comentários</h3>
      <ul className="space-y-11">
        {
          announcementComents.length ?
            (announcementComents.map((comment, index) => (
              <li key={index}>
                <div className="flex items-center gap-2 mb-3">
                  <ProfileImage name={comment.user.name} size="small" userId={convertToNumber(comment.user.name)} />
                  <span className="text-sm font-medium font-inter text-grey-0">{comment.user.name}</span>
                  <Dot className="text-grey-3" />
                  <span className="text-xs font-normal font-inter text-grey-3">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm font-normal text-grey-2 font-inter">
                  { comment.comment }
                </p>
              </li>))
            ) :
            <li>
              <p className="text-sm font-normal text-grey-2 font-inter">
                Escreva o primeiro comentário.
              </p>
            </li>
        }
      </ul>
    </section>
  );
}
