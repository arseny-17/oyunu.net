import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '../lib/config/withSession'
import React, { use } from "react"
import axios from 'axios'
import { useRouter } from "next/router"

export default function Category(props) {

const [title, setTitle] = React.useState('')
const [slug, setSlug] = React.useState('')
const [attr, setAttr] = React.useState('')

const router = useRouter()

const addCategory = async () => {
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/add-category`, {
            title, slug, attr
        }).then(() => {
            console.log('success')
            return router.push("/admin/categories")
        })
    } catch(e){
        console.log(e)
    }
}

  return (
   <Layout title="Создание новой категории" user={props.user}>
        <div className="h2">
            <h2>Add new category</h2>
        </div>
        <div className="info_content">
            <form onSubmit={ (e) => {
                e.preventDefault()
                addCategory()
                }}>
                <div className="info_field">
                    <span>Заголовок</span>
                    <input type="text" required onChange={e => {
                        setTitle(e.target.value)
                    }} />
                </div>
                <div className="info_field">
                    <span>Slug</span>
                    <input type="text" required onChange={e => {
                        setSlug( e.target.value )
                    }}/>
                </div>
                <div className="info_field">
                    <span>Attr</span>
                    <input type="text" required onChange={e => {
                        setAttr(e.target.value)
                    }} />
                </div>
                <button type="submit">Создать категорию</button>
            </form>
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null
  
        return {
            props: { 
                user: user
            }
        }
    }
  )