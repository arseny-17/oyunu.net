import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Pages(props) {
  return (
   <Layout title="Список страниц" user={props.user} posts={props.posts}>
        <div className="h2">
            <h2>Pages</h2>
        </div>
        <div className="pages_list">
                { props.posts.map(post =>(
                    <div className="pages_item" key={post.id}>
                        <h3>{ post.title }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/page/${post.id}`} className="details"><i className="fa fa-pencil" aria-hidden="true"></i>редактировать</Link>
                        </div> 
                    </div>
                    )) 
                }
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null
        let posts = await prisma.post.findMany() || null
  
        return {
            props: { 
                user: user, 
                posts: posts 
            }
        }
    }
  )