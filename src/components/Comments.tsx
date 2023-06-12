import { Dot } from 'lucide-react';

export default function Comments() {
  return (
    <section className='bg-grey-grey10 py-9 px-11 w-max-[751px] w-full rounded'>
      <h3 className='mb-6 text-xl font-semibold font-lexend text-grey-grey1'>Comentários</h3>
      <ul className='space-y-11'>
        <li>
          <div className='flex items-center gap-2 mb-3'>
            <div className='w-[32px] h-[32px] bg-randomProfile-random1 rounded-full flex justify-center items-center font-inter font-medium text-sm text-grey-whiteFixed'>
              JL
            </div>
            <span className='text-sm font-medium font-inter text-grey-0'>Júlia Lima</span>
            <Dot className='text-grey-3' />
            <span className='text-xs font-normal font-inter text-grey-3'>há 3 dias</span>
          </div>
          <p className='text-sm font-normal text-grey-2 font-inter'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </li>
        <li>
          <div className='flex items-center gap-2 mb-3'>
            <div className='w-[32px] h-[32px] bg-randomProfile-random4 rounded-full flex justify-center items-center font-inter font-medium text-sm text-grey-whiteFixed'>
              MA
            </div>
            <span className='text-sm font-medium font-inter text-grey-0'>Marcos Antônio</span>
            <Dot className='text-grey-3' />
            <span className='text-xs font-normal font-inter text-grey-3'>há 7 dias</span>
          </div>
          <p className='text-sm font-normal text-grey-2 font-inter'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </li>
        <li>
          <div className='flex items-center gap-2 mb-3'>
            <div className='w-[32px] h-[32px] bg-randomProfile-random9 rounded-full flex justify-center items-center font-inter font-medium text-sm text-grey-whiteFixed'>
              CS
            </div>
            <span className='text-sm font-medium font-inter text-grey-0'>Camila Silva</span>
            <Dot className='text-grey-3' />
            <span className='text-xs font-normal font-inter text-grey-3'>há 1 mês</span>
          </div>
          <p className='text-sm font-normal text-grey-2 font-inter'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </li>
      </ul>
    </section>
  );
}