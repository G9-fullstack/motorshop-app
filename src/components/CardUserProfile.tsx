import Link from 'next/link';
import ProfileImage from './ProfileImage';

export default function CardUserProfile() {
  return (
    <div className='rounded bg-grey-grey10 w-[440px] h-[426px] flex flex-col items-center justify-center p-11'>
      <ProfileImage name='Samuel Leão' />
      <span className='mb-8 text-xl font-semibold mt-7 text-grey-grey1 font-lexend'>Samuel Leão</span>
      <p className='mb-8 text-base font-normal text-center font-inter text-grey-grey2'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      </p>
      <Link href={'#'} className='py-3 text-base font-semibold rounded px-7 bg-grey-grey0 text-grey-whiteFixed font-inter'>Ver todos anuncios</Link>
    </div>
  );
}