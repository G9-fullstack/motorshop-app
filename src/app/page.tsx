import CarCard from "@/components/CarCard";
import Filter from "@/components/Filter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Filter />
      <div className="grid grid-cols-3 pl-80 pr-36 pt-16 ">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
      <Footer />
    </main>
  );
}
