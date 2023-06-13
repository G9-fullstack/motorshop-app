import { AnnounceProps } from "@/mock";
import AnnounceItem from "./AnnounceItem";

type AnnounceListProps = {
  filteredAnnounces: AnnounceProps[] | undefined
}

export default function AnnounceList(props: AnnounceListProps) {
  return (
    <ul
      className="flex flex-1 flex-row overflow-x-scroll gap-x-3 ml-3 px-3 py-6 max-w-6xl scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed
    md:gap-x-12 md:gap-y-24 md:ml-0 md:pr-16 md:overflow-x-hidden md:flex-row md:flex-wrap md:justify-end md:items-start 2xl:justify-start">
      {props.filteredAnnounces && props.filteredAnnounces.map(announce => (
        <AnnounceItem key={announce.id} announce={announce} />
      ))}
    </ul>);
}
