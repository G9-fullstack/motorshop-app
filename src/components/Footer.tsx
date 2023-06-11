'use client'
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo-footer.svg";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-grey-0 text-grey-whiteFixed flex flex-col items-center jusitfy-center py-11 px-2 gap-14 md:px-16 md:py-14 md:flex-row md:justify-between">
      <Image src={logo} alt="logo" />
      <p className="body-2-400 text-grey-whiteFixed">© 2022 -  Todos os direitos reservados.</p>
      <button className="bg-grey-1 rounded-[4px] px-[22px] py-4" onClick={scrollToTop}>
        <ChevronUp size={16} />
      </button>
    </div>
  )
}