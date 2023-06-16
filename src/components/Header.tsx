"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import brandingLogo from "../../public/branding-logo.svg";


export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 grid h-20 px-14 border-b-2 bg-grey-whiteFixed place-items-center border-grey-6">
      <div className="container flex items-center justify-between h-full">
        <Image src={brandingLogo} alt="Motorshop logo" height={26} />
        <div className="items-center hidden h-full border-l-2 border-grey-6 font-inter pl-11 gap-11 md:flex">
          <Link href={"#"} className="text-base font-semibold leading-7 text-grey-2">
            Fazer Login
          </Link>
          <Link href={"#"} className="px-5 py-3 text-base font-semibold text-center bg-transparent border-2 rounded border-grey-4 text-grey-0">
            Cadastrar
          </Link>
        </div>
        <div
          className="cursor-pointer md:hidden text-grey-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
      {isOpen && (<div className="absolute flex flex-col justify-between w-full px-3 py-8 top-full h-44 bg-grey-whiteFixed md:hidden">
        <Link href={"#"} className="text-base font-semibold leading-7 text-grey-2">
          Fazer Login
        </Link>
        <Link href={"#"} className="px-5 py-3 text-base font-semibold text-center bg-transparent border-2 rounded border-grey-4 text-grey-0">
          Cadastrar
        </Link>
      </div>)}
    </header>
  );
}
