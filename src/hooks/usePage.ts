import { mockAnnounces } from "@/mock";
import { useState } from "react";

const INITIAL_PAGE = 1;
const PER_PAGE = 12;
export default function usePage(): [number, () => void, () => void] {
  const [page, setPage] = useState(INITIAL_PAGE);

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

  return [
    page,
    previousPage,
    nextPage
  ];
}
