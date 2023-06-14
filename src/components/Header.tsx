"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import brandingLogo from "../../public/branding-logo.svg";
import { usePathname } from "next/navigation";
import ProfileImage from "./ProfileImage";


export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const isLogged = true;
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 grid h-20 border-b-2 px-14 bg-grey-whiteFixed place-items-center border-grey-6">
      <div className="container flex items-center justify-between h-full">
        <Image src={brandingLogo} alt="Motorshop logo" height={26} />
        {!isLogged && (<div className="hidden h-full md:flex md:items-center">
          {pathname != "/" && (<Link href={"/"} className="text-base font-normal text-grey-2 font-inter mr-11">Home</Link>)}
          <div className="flex items-center h-full border-l-2 border-grey-6 font-inter pl-11 gap-11">
            <Link href={"/login"} className="text-base font-semibold leading-7 text-grey-2">
              Fazer Login
            </Link>
            <Link href={"/register"} className="px-5 py-3 text-base font-semibold text-center bg-transparent border-2 rounded border-grey-4 text-grey-0">
              Cadastrar
            </Link>
          </div>
        </div>)}
        {isLogged && (<div className="relative flex items-center h-full border-l-2 border-grey-6 pl-11">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hidden md:flex items-center gap-2"
          >
            <ProfileImage name="Samuel Leão" size="small" userId={10} />
            <span className="text-base font-normal font-inter text-grey-2">Samuel Leão</span>
          </button>
          <div className="absolute top-full right- z-[9999] w-[12.5rem] bg-grey-9 rounded shadow-2xl">
            <ul>
              <li>
                <button>Editar Perfil</button>
              </li>
              <li>
                <button>Editar endereço</button>
              </li>
              <li>
                <button>Meus Anúncios</button>
              </li>
              <li>
                <button>Sair</button>
              </li>
            </ul>
          </div>
        </div>)}
        <div
          className="cursor-pointer md:hidden text-grey-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
      {!isLogged && isOpen && (<div className="absolute flex flex-col justify-between w-full gap-4 px-3 py-8 shadow-2xl top-full h-max bg-grey-whiteFixed md:hidden">
        {pathname != "/login" && pathname != "/register" && (<Link href={"/login"} className="text-base font-semibold leading-7 text-grey-2">
          Fazer Login
        </Link>)}
        {pathname != "/" && (<Link href={"/"} className="text-base font-semibold leading-7 text-grey-2">
          Ir para Home
        </Link>)}
        <Link href={pathname == "/register" ? "/login" : "/register"} className="px-5 py-3 text-base font-semibold text-center bg-transparent border-2 rounded border-grey-4 text-grey-0">
          {pathname == "/register" ? "Login" : "Cadastrar"}
        </Link>
      </div>)}
    </header>
  );
}
