import { mockAnnounces } from "@/mock";
import { ReactNode } from "react";
import Button from "./Button";

const INITIAL_PAGE = 1;
const PER_PAGE = 12;

export type ListInfoProps = {
  handleShowFilter?: () => void;
  page: number;
  nextPage: () => void;
  previousPage: () => void;
  children?: ReactNode;
}

export default function ListInfo(props: ListInfoProps) {

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-4 mb-10 w-full">
      {props.handleShowFilter &&
        <div onClick={props.handleShowFilter}>
          <Button details="md:hidden text-white" size="big" style="brand-1" width={280}>Filtros</Button>
        </div>
      }
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-2 heading-5-600 text-grey-3/50">
          <span className="text-grey-3">{props.page}</span>
          {props.page !== Math.ceil(mockAnnounces.length / PER_PAGE) && <span> - {Math.ceil(mockAnnounces.length / PER_PAGE)}</span>}
        </div>
        <div className="flex flex-row gap-4">
          <span onClick={props.previousPage} className="text-brand-2 heading-5-600 cursor-pointer" hidden={!(props.page > INITIAL_PAGE)}>
            {"<"} Anterior
          </span>
          <span onClick={props.nextPage} className="text-brand-2 heading-5-600 cursor-pointer" hidden={!(props.page < Math.ceil(mockAnnounces.length / PER_PAGE))}>
            Seguinte {">"}
          </span>
          {props.children}
        </div>
      </div>
    </div>)
}