"use client";
import AnnounceList from "@/components/AnnounceList";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import { AnnounceProps, mockAnnounces } from "@/mock";
import { useEffect, useMemo, useState } from "react";

export type SelectedFiltersProps = {
  brand?: string;
  model?: string;
  color?: string;
  year?: string;
  mileage?: string;
  price?: number;
};

const PER_PAGE = 12;
const INITIAL_PAGE = 1;

export default function Home() {
  const [announces, setAnnounces] = useState<AnnounceProps[]>();
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersProps>({});
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);

  const handleShowFilter = () => setIsOpen(!isOpen);

  const handleFilterReset = () => setSelectedFilters({});

  const handleFilterChange = (option: keyof SelectedFiltersProps, value: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters[option] === value) {
        const updatedFilters = { ...prevFilters, };
        delete updatedFilters[option];
        return updatedFilters;
      }
      return { ...prevFilters, [option]: value, };
    });
  };

  const nextPage = () => {
    const lessThanOne = page < Math.ceil(mockAnnounces.length / PER_PAGE);
    if (lessThanOne) {
      setPage(page + 1);
      window.scrollTo({ top: 500, behavior: "smooth", });
    }
  };

  const previousPage = () => {
    const moreThanOne = page > 1;
    if (moreThanOne) {
      setPage(page - 1);
      window.scrollTo({ top: 500, behavior: "smooth", });
    }
  };

  useEffect(() => {
    (async function () {
      const startIndex = (page - INITIAL_PAGE) * PER_PAGE;
      const endIndex = page * PER_PAGE;
      setAnnounces(mockAnnounces.slice(startIndex, endIndex));
    })();
    handleFilterReset();
  }, [page]);

  const filteredAnnounces = useMemo(() => {
    if (!announces) {
      return [];
    }

    return announces.filter((announce: AnnounceProps) => {
      return Object.entries(selectedFilters).every(([key, value]) => {
        if (key === "price" || key === "mileage") {
          const filterValue = Number(value);
          const announceValue = Number(announce[key as keyof AnnounceProps]);
          return !value || announceValue <= filterValue;
        }
        return !value || announce[key as keyof AnnounceProps] === value;
      });
    });
  }, [announces, selectedFilters]);

  return (
    <main>
      {/* COVER */}
      <div className="mt-20 h-[550px] w-full bg-home bg-cover bg-center px-2">
        <div className="flex flex-col items-center justify-center h-full w-full gap-8">
          <h1 className="font-lexend font-bold text-center text-white text-3xl">Motors Shop</h1>
          <p className="text-white text-center text-xl">A melhor plataforma de anúncios de carros do pais</p>
        </div>
      </div>
      {/* MAIN */}
      <div className="xl:mx-auto my-16">
        <div className="md:flex-1 md:flex md:justify-between md:items-start">
          {/* FILTER */}
          <Filter
            handleShowFilter={handleShowFilter}
            isOpen={isOpen} announces={announces}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            handleFilterReset={handleFilterReset} />
          {/* ADS */}
          <AnnounceList filteredAnnounces={filteredAnnounces} />
        </div>
      </div>
      {/* INFO ADS */}
      <div className="flex flex-col items-center justify-center gap-10 py-4 mb-10 w-full">
        <div onClick={handleShowFilter}>
          <Button details="md:hidden text-white" size="big" style="brand-1" width={280}>Filtros</Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex items-center justify-center gap-2 heading-5-600 text-grey-3/50">
            <span className="text-grey-3">{page}</span>
            {page !== Math.ceil(mockAnnounces.length / PER_PAGE) && <span> - {Math.ceil(mockAnnounces.length / PER_PAGE)}</span>}
          </div>
          <div className="flex flex-row gap-4">
            <span onClick={previousPage} className="text-brand-2 heading-5-600 cursor-pointer" hidden={!(page > INITIAL_PAGE)}>
              {"<"} Anterior
            </span>
            <span onClick={nextPage} className="text-brand-2 heading-5-600 cursor-pointer" hidden={!(page < Math.ceil(mockAnnounces.length / PER_PAGE))}>
              Seguinte {">"}
            </span>
          </div>
        </div>
      </div>
    </main >
  );
}
