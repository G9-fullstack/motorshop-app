import AnnounceDetail from '@/components/AnnounceDetail';

export default function Announcement() {
	return (
		<>
			<div className='bg-grey-grey8 pb-16'>
				<div className='absolute z-0 top-20 bg-brand-brand1 w-full h-[442px] md:h-[582px]' />
				<main className='container m-auto relative z-10 px-3'>
					<AnnounceDetail />
				</main>
			</div>
		</>
	);
}
