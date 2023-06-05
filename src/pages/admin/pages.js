import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Pages(props) {

const main_page_id = props.options.find(x => x.key === 'mainPageID').value

  return (
   <Layout title="Список страниц" user={props.user} posts={props.posts}>
        <div className="h2">
            <h2>Страницы</h2>
        </div>
        <div className="pages_list">
                { props.posts.map(post =>(
                    <div className="pages_item" key={post.id}>
                        <h3>{ post.title } { (post.id == main_page_id) ? <span>Главная страница</span> : '' }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/page/${post.id}`} className="details">
                                <span class="material-icons">edit</span>редактировать
                            </Link>
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
        let options = await prisma.options.findMany() || null
  
        return {
            props: { 
                user: user, 
                posts: JSON.parse(JSON.stringify(posts)),
                options: options
            }
        }
    }
  )