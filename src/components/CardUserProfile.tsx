import Link from 'next/link';
import ProfileImage from './ProfileImage';

export default function CardUserProfile() {
  return (
    <div className='rounded bg-grey-10 w-max-[440px] w-full h-[426px] flex flex-col items-center justify-center p-11'>
      <ProfileImage name='Samuel Leão' />
      <span className='mb-8 text-xl font-semibold mt-7 text-grey-1 font-lexend'>Samuel Leão</span>
      <p className='mb-8 text-base font-normal text-center font-inter text-grey-2'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      </p>
      <Link href={'#'} className='py-3 text-base font-semibold rounded px-7 bg-grey-0 text-grey-whiteFixed font-inter'>Ver todos anuncios</Link>
    </div>
  );
}