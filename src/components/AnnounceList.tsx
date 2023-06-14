import { AnnounceProps } from "@/mock"
import AnnounceItem from "./AnnounceItem"
import PlaceholderItem from "./PlaceholderItem"

type AnnounceListProps = {
  announces: AnnounceProps[] | undefined
}

export default function AnnounceList(props: AnnounceListProps) {
  return (
    <ul
      className="flex w-full py-3 flex-row overflow-x-scroll gap-x-3 scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed
                 md:gap-x-12 md:gap-y-24 md:overflow-x-hidden md:flex-row md:flex-wrap md:justify-end md:items-start 2xl:justify-start">
      {props.announces ? (
        props.announces.map(announce => (
          <AnnounceItem key={announce.id} announce={announce}/>
        ))
      ) : (
        [...Array(12)].map(() => (
          <PlaceholderItem key={Math.random()} />
        ))
      )}
    </ul>)
}