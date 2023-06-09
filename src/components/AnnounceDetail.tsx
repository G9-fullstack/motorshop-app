import Image from 'next/image'
import cartAnnounceDetail from '../../public/cart-detail-bg.png'

export default function AnnounceDetail() {
	return (
		<>
			<div className='bg-brand-brand1 w-full min-h-[436px] grid place-items-center px-3'>
				<figure className='bg-grey-grey10 w-full h-[22rem] rounded grid place-items-center'>
					<Image
						src={cartAnnounceDetail}
						alt='Imagem do Carro'
						width={290}
						height={250}
					/>
				</figure>
			</div>
			
			<div className='bg-grey-grey8 w-full px-3'>
				<section className='bg-grey-grey10 rounded w-full py-9 px-7 mb-9'>
					<h2 className='font-semibold text-xl mb-8'>Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200 </h2>
					<span className='bg-brand-brand4 text-brand-brand1 rounded font-inter font-medium text-sm py-1 px-2 mr-3'>2013</span>
					<span className='bg-brand-brand4 text-brand-brand1 rounded font-inter font-medium text-sm py-1 px-2'>0 KM</span>
					<small className='text-grey-grey01 text-base font-medium block mt-8'>R$ 00.000,00</small>
					<button className='bg-brand-brand1 text-grey-whiteFixed rounded text-sm w-24 h-9 mt-7'>Comprar</button>
				</section>

				<section className='bg-grey-grey10 rounded w-full py-9 px-7 mb-4'>
					<h3 className='font-semibold text-xl mb-8'>Descrição</h3>
					<p className='font-inter text-grey-grey2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nostrum architecto sequi autem commodi animi labore ipsa expedita tempora. Rem ipsam molestias cum reiciendis neque recusandae optio nulla quae architecto.
					</p>
				</section>

				<section className='bg-grey-grey10 rounded w-full p-9'>
					<h3 className='font-semibold text-xl mb-8'>Fotos</h3>
					<ul className='grid grid-cols-3 gap-x-1 gap-y-12'>
						{[1, 2, 3, 4, 5, 6].map((element) => (
							<li>
								<figure className='bg-grey-grey8 rounded w-[5rem] h-[5rem] grid place-items-center'>
									<Image src={cartAnnounceDetail} alt='Imagem do Carro' width={70} height={50}/>
								</figure>
							</li>
						))}
					</ul>
				</section>
			</div>
		</>
	)
}
