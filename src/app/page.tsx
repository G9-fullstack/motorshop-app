"use client";
import AnnounceList from "@/components/AnnounceList";
import Filter from "@/components/Filter";
import ListInfo from "@/components/ListInfo";
import PlaceholderItem from "@/components/PlaceholderItem";
import { useSeller } from "@/contexts/SellerContext";
import { announceResponse } from "@/schemas/announce.schema";
import { useEffect, useMemo, useState } from "react";

export type SelectedFiltersProps = {
  brand?: string;
  model?: string;
  color?: string;
  year?: string;
  mileage?: string;
  price?: number | "";
};

export default function Home() {
  const { getAnnouncesSeller, announcesSeller, loading } = useSeller();
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersProps>({});

  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    getAnnouncesSeller();
  }, []);

  const filteredAnnounces = useMemo(() => {
    if (!announcesSeller.data) return [];

    return announcesSeller.data.filter(announce => {
      return Object.entries(selectedFilters).every(([key, value]) => {
        if (key === "price" || key === "mileage") {
          const filterValue = Number(value);
          const announceValue = Number(announce[key as keyof announceResponse]);
          return !value || announceValue <= filterValue;
        }
        return !value || announce[key as keyof announceResponse] === value;
      });
    });
  }, [announcesSeller.data, selectedFilters]);

  const renderPlaceholderItems = () => {
    return [...Array(12)].map(() => <PlaceholderItem key={Math.random()} />);
  };

  console.log(announcesSeller.data.length > 0)
  return (
    <main>
      <div className="mt-20 h-[550px] w-full bg-home bg-cover bg-center px-2">
        <div className="flex flex-col items-center justify-center h-full w-full gap-8">
          <h1 className="font-lexend font-bold text-center text-white text-3xl">
            Motors Shop
          </h1>
          <p className="text-white text-center text-xl">
            A melhor plataforma de anúncios de carros do pais
          </p>
        </div>
      </div>
      <div className="xl:mx-auto my-16">
        <div className="md:flex-1 md:flex md:justify-between md:items-start">
          <Filter
            handleShowFilter={handleShowFilter}
            isOpen={isOpen}
            announces={announcesSeller.data}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            handleFilterReset={handleFilterReset}
          />
          <div className="flex flex-1 ml-3 px-3 max-w-6xl md:ml-0 md:pr-16">
            {loading
              ? (<div className="flex w-full py-3 flex-row overflow-x-scroll gap-x-3 scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed md:gap-x-12 md:gap-y-24 md:overflow-x-hidden md:flex-row md:flex-wrap md:justify-end md:items-start 2xl:justify-start">
                {renderPlaceholderItems()}
              </div>)
              : announcesSeller.data.length ? (
                <AnnounceList announces={filteredAnnounces} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <h1 className="font-lexend font-bold text-center text-brand-3 text-3xl">
                    Nenhum anúncio encontrado
                  </h1>
                  <p className="text-center text-brand-3 text-xl">
                    Tente novamente com outros filtros
                  </p>
                </div>
              )
            }
            {/* {announcesSeller.data.length ? (
              announcesSeller.data.length > 0 ? (
                <AnnounceList announces={filteredAnnounces} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <h1 className="font-lexend font-bold text-center text-brand-3 text-3xl">
                    Nenhum anúncio encontrado
                  </h1>
                  <p className="text-center text-brand-3 text-xl">
                    Tente novamente com outros filtros
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="font-lexend font-bold text-center text-brand-3 text-3xl">
                  Nenhum anúncio encontrado
                </h1>
                <p className="text-center text-brand-3 text-xl">
                  Tente novamente com outros filtros
                </p>
              </div>
              <div className="flex w-full py-3 flex-row overflow-x-scroll gap-x-3 scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed md:gap-x-12 md:gap-y-24 md:overflow-x-hidden md:flex-row md:flex-wrap md:justify-end md:items-start 2xl:justify-start">
                {renderPlaceholderItems()}
              </div>
            )} */}
          </div>
        </div>
      </div>
      <ListInfo
        announces={announcesSeller.data}
        prevPage={() => getAnnouncesSeller(undefined, announcesSeller.prevPage)}
        nextPage={() => getAnnouncesSeller(undefined, announcesSeller.nextPage)}
        currentPage={announcesSeller.currentPage}
        totalPages={announcesSeller.totalPages}
      />
    </main>
  );
}
