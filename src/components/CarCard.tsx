import Image from "next/image";
import car from "../../public/car.svg";

export default function CarCard() {
  return (
    <div className="bg-white  w-full p-6 max-h-250">
      <Image
        className="w-full h-48 object-cover bg-brand-4"
        src={car}
        alt={""}
      />
      <p className="text-xl font-bold mt-4">Porsche 178</p>
      <p className="text-gray-500 mt-2 truncate">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        veritatis nesciunt unde illum, saepe quam rerum reiciendis quisquam
        explicabo dignissimos? Eligendi nesciunt asperiores aperiam nam
        accusamus nobis minus beatae neque.
      </p>
      <div className="flex items-center mt-4">
        <p className="text-sm text-white font-bold mr-4 bg-randomProfile-random1 pl-2 pr-2 pt-1 pb-1 rounded-100 rounded-full">
          C
        </p>
        <p className="text-sm">Camila</p>
      </div>
      <div className="flex items-center mt-4 justify-between">
        <div className="mr-4 flex items-center gap-4">
          <p className="text-sm font-bold text-brand-1 bg-brand-4 p-2 rounded-md">
            0KM
          </p>
          <p className="text-sm">2019</p>
        </div>
        <p className="text-xl font-bold">R$10,000,000</p>
      </div>
    </div>
  );
}
