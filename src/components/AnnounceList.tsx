import { usePathname } from "next/navigation";
import AnnounceItem from "./AnnounceItem";
import PlaceholderItem from "./PlaceholderItem";
import { announceResponse } from "@/schemas/announce.schema";

type AnnounceListProps = {
  announces: announceResponse[] | undefined
}

export default function AnnounceList(props: AnnounceListProps) {
  const isProfile = usePathname().includes("profile");

  return (
    <ul
      className={`flex w-full py-3 flex-row overflow-x-scroll gap-x-3 scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed
      md:gap-x-12 md:gap-y-24 md:overflow-x-hidden md:flex-row md:flex-wrap md:justify-end md:items-start ${isProfile ? "2xl:justify-center" : "2xl:justify-end"}`}>
      {props.announces ? (
        props.announces.map(announce => (
          <AnnounceItem key={announce.id} announce={announce} />
        )))
        :
        ([...Array(12)].map(() => (
          <PlaceholderItem key={Math.random()} />
        )))
      }
    </ul>);
}
