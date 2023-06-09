'use client';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-grey-grey0 text-grey-whiteFixed pt-11 pb-11 pl-4 pr-4 grid grid-auto-rows-auto grid-cols-1 justify-center place-items-center gap-14 md:grid-cols-3 md:gap-0'>
			<h1 className='text-4xl font-semibold md:justify-self-start'>Motors <span className='text-xl'>shop</span></h1>
			<p className='font-inter font-light text-sm md:w-max'>© 2022 - Todos os direitos reservados.</p>
			<button className='h-12 w-12 bg-grey-grey1 grid place-items-center rounded transition md:justify-self-end hover:bg-grey-grey2'>
				<ChevronUp size={24}/>
			</button>
		</footer>
	)
}
