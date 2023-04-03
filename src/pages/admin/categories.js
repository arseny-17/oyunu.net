import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '../../pages/lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default function Categories(props) {
  return (
   <Layout title="Список языков" user={props.user} cats={props.cats}>
        <div className="h2">
            <h2>Languages</h2>
        </div>
        <div className="pages_list">
                { props.cats.map(cat =>(
                    <div className="pages_item" key={cat.id}>
                        <h3>{ cat.title }</h3>
                        <div className="pages_item_moves">
                            <Link href={`/admin/edit/category/${cat.id}`} className="details"><i className="fa fa-pencil" aria-hidden="true"></i>редактировать</Link>
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
        let cats = await prisma.lang.findMany() || null
  
        return {
            props: { 
                user: user, 
                cats: cats 
            }
        }
    }
  )