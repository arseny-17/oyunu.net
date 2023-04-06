import Layout from "../../components/admin/Layout"
import Link from "next/link"
import { withSessionSsr } from '@/lib/config/withSession'

export default function Admin({user}) {

  return (
   <Layout title="Главная админки" user={user}>
      <h2>Welcome to ADMIN PANEL</h2>
        <div className="navigation_list">
            <div className="navigation_item">
                <Link href="/admin"><i className="fa fa-globe" aria-hidden="true"></i>Console</Link>
            </div>
            <div className="navigation_item">
              <Link href="/admin/options"><i className="fa fa-anchor" aria-hidden="true"></i>Main Info</Link>
            </div>
            <div className="navigation_item">
              <Link href="/admin/pages"><i className="fa fa-file-text" aria-hidden="true"></i>Pages</Link>
            </div>
            <div className="navigation_item">
              <Link href="/admin/categories"><i className="fa fa-object-ungroup" aria-hidden="true"></i>Categories</Link>
            </div>
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
  async ({req, res}) => {
      let user = req.session.user || null 

      return {
          props: { user }
      }
  }
)