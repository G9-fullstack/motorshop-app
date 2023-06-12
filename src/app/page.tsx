import CarCard from "@/components/CarCard";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <main>
      <Filter />
      <div className="grid grid-cols-3 pl-80 pr-36 pt-16 ">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
    </main>
  );
}
