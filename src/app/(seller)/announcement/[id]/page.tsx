"use client";
import AnnounceDetail from "@/components/AnnounceDetail";
import { useSeller } from "@/contexts/SellerContext";
import { useEffect } from "react";

type AnnouncementProps = {
  params: {
    id: string
  }
}


export default function Announcement({params,}: AnnouncementProps) {
  const { getAnnounce, announce, } = useSeller();

  useEffect(() => {
    getAnnounce(params.id);
  }, []);

  if (!announce) return null;

  return (
    <>
      <div className="bg-grey-8 pb-16 mt-[118px]">
        <div className="absolute z-0 top-20 bg-brand-1 w-full h-[442px] md:h-[582px]" />
        <main className="container m-auto relative z-10 px-3">
          <AnnounceDetail />
        </main>
      </div>
    </>
  );
}
