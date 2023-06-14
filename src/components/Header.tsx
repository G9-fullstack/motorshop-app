"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import brandingLogo from "../../public/branding-logo.svg";
import { usePathname } from "next/navigation";


export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 grid h-20 px-14 border-b-2 bg-grey-whiteFixed place-items-center border-grey-6">
      <div className="container flex items-center justify-between h-full">
        <Image src={brandingLogo} alt="Motorshop logo" height={26} />
        <div className="hidden md:flex md:items-center">
          {pathname != "/" && (<Link href={"/"} className="text-grey-2 font-inter font-normal text-base mr-11">Home</Link>)}
          <div className="flex items-center h-full border-l-2 border-grey-6 font-inter pl-11 gap-11">
            <Link href={"/login"} className="text-base font-semibold leading-7 text-grey-2">
              Fazer Login
            </Link>
            <Link href={"/register"} className="px-5 py-3 text-base font-semibold text-center bg-transparent border-2 rounded border-grey-4 text-grey-0">
              Cadastrar
            </Link>
          </div>
        </div>
        <div
          className="cursor-pointer md:hidden text-grey-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
      {isOpen && (<div className="absolute flex flex-col justify-between w-full px-3 py-8 gap-4 top-full h-max bg-grey-whiteFixed md:hidden">
        {pathname != "/login" && pathname != "/register" && (<Link href={"/login"} className="text-base font-semibold leading-7 text-grey-2">
          Fazer Login
        </Link>)}
        {pathname != "/" && (<Link href={"/"} className="text-base font-semibold leading-7  text-grey-2">
          Ir para Home
        </Link>)}
        <Link href={pathname == "/register" ? "/login" : "/register"} className="px-5 py-3 text-base font-semibold text-center bg-transparent border-2 rounded border-grey-4 text-grey-0">
          {pathname == "/register" ? "Login" : "Cadastrar"}
        </Link>
      </div>)}
    </header>
  );
}
