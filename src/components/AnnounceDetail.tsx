import Header from '@/components/Header'
import Image from 'next/image'
import cartAnnounceDetail from '../../../public/cart-detail-bg.png'

export default function AnnounceDetail() {
	return (
		<>
			<Header />
			<div>
				<figure>
					<Image src={cartAnnounceDetail} alt='Imagem do Carro' width={290} height={250}/>
				</figure>
			</div>
			
			<div>
				<section>
					<h2>Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200 </h2>
					<span>2013</span>
					<span>0 KM</span>
					<small>R$ 00.000,00</small>
					<button>Comprar</button>
				</section>

				<section>
					<h3>Descrição</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nostrum architecto sequi autem commodi animi labore ipsa expedita tempora. Rem ipsam molestias cum reiciendis neque recusandae optio nulla quae architecto.
					</p>
				</section>
				<section>
					<h3>Fotos</h3>
					<ul>
						<li>
							<Image src={cartAnnounceDetail} alt='Imagem do Carro' width={94} height={54}/>
						</li>
					</ul>
				</section>
			</div>
		</>
	)
}
