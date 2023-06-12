import AnnounceDetail from '@/components/AnnounceDetail'
import CardUserProfile from '@/components/CardUserProfile'
import CommentForm from '@/components/CommentForm'
import Comments from '@/components/Comments'

export default function Announcement() {
	return (
		<main className='mt-20'>
			<AnnounceDetail />
			<CardUserProfile />
			<Comments />
			<CommentForm />
		</main>
	)
}
