import AnnounceDetail from '@/components/AnnounceDetail'
import CardUserProfile from '@/components/CardUserProfile'
import CommentForm from '@/components/CommentForm'
import Comments from '@/components/Comments'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Announcement() {
  return (
	<>
		<Header/>
		<main>
			<AnnounceDetail/>
			<CardUserProfile/>
			<Comments/>
			<CommentForm/>
		</main>
		<Footer/>
	</>
  )
}
