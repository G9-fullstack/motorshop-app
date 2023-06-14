"use client"
import AnnounceList from "@/components/AnnounceList";
import Filter from "@/components/Filter";
import ListInfo from "@/components/ListInfo";
import usePage from "@/hooks/usePage";
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
  const [page, nextPage, previousPage] = usePage();

  const handleShowFilter = () => setIsOpen(!isOpen);
  const handleFilterReset = () => setSelectedFilters({});
  const handleFilterChange = (option: keyof SelectedFiltersProps, value: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters[option] === value) {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[option];
        return updatedFilters;
      }
      return { ...prevFilters, [option]: value };
    });
  };
  useEffect(() => {
    (async function () {
      const startIndex = (page - INITIAL_PAGE) * PER_PAGE;
      const endIndex = page * PER_PAGE;
      setAnnounces(mockAnnounces.slice(startIndex, endIndex))
    })()
    handleFilterReset();
  }, [page])
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
      <div className="mt-20 h-[550px] w-full bg-home bg-cover bg-center px-2">
        <div className="flex flex-col items-center justify-center h-full w-full gap-8">
          <h1 className="font-lexend font-bold text-center text-white text-3xl">Motors Shop</h1>
          <p className="text-white text-center text-xl">A melhor plataforma de anúncios de carros do pais</p>
        </div>
      </div>
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
          <div className="flex flex-1 ml-3 px-3 max-w-6xl md:ml-0 md:pr-16">
            <AnnounceList announces={filteredAnnounces} />
          </div>
        </div>
      </div>
      <ListInfo handleShowFilter={handleShowFilter} page={page} previousPage={previousPage} nextPage={nextPage} />
    </main >
  );
}
