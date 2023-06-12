import AnnounceDetail from '@/components/AnnounceDetail'
import CardUserProfile from '@/components/CardUserProfile'
import CommentForm from '@/components/CommentForm'
import Comments from '@/components/Comments'

export default function Announcement() {
	return (
		<main>
			<AnnounceDetail />
			<CardUserProfile />
			<Comments />
			<CommentForm />
		</main>
	)
}
