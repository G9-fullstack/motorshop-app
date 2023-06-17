import { SellerProvider } from "@/contexts/SellerContext";

export default function ProfileLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <>
      <SellerProvider>
        {children}
      </SellerProvider>
    </>
  );
}
