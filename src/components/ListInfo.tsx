import { ReactNode } from "react";
import Button from "./Button";
import { announceResponse } from "@/schemas/announce.schema";

const INITIAL_PAGE = 1;
const PER_PAGE = 12;

type ListInfoProps = {
  nextPage: () => void;
  prevPage: () => void;
  handleShowFilter?: () => void;
  announces: announceResponse[];
  currentPage?: number;
  totalCount?: number;
  children?: ReactNode;
};

export default function ListInfo({
  announces,
  handleShowFilter,
  children,
  nextPage,
  prevPage,
  currentPage = 1,
  totalCount,
}: ListInfoProps) {
  if (!announces || announces.length === 0) {
    return null;
  }

  const totalPages = Math.ceil((totalCount ?? 0) / PER_PAGE);
  const isNext = currentPage && currentPage < totalPages;
  const isPrev = currentPage && currentPage > INITIAL_PAGE;

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-4 mb-10 w-full">
      {handleShowFilter && (
        <div onClick={handleShowFilter}>
          <Button details="md:hidden text-white" size="big" style="brand-1" width={280}>
            Filtros
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-2 heading-5-600 text-grey-3/50">
          {[...Array(totalPages)].map((_, index) => (
            <span key={index} className={`${currentPage === index + 1 ? "text-grey-3" : ""} px-1`}>
              {index + 1}
            </span>
          ))}
        </div>

        <div className="flex flex-row gap-4">
          {isPrev && (
            <span onClick={prevPage} className="text-brand-2 heading-5-600 cursor-pointer">
              {"<"} Anterior
            </span>
          )}

          {isNext && (
            <span onClick={nextPage} className="text-brand-2 heading-5-600 cursor-pointer">
              Seguinte {">"}
            </span>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
