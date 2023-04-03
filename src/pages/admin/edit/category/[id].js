import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '../../../lib/config/withSession'
import React, { use } from "react"
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { useRouter } from "next/router"

export default function Category(props) {

    const [title, setTitle] = React.useState(props.category.title)
    const [slug, setSlug] = React.useState(props.category.slug)
    const [attr, setAttr] = React.useState(props.category.attr)
    const id = props.category.id
    
    const router = useRouter()

    const editCategory = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/edit-category`, {
                id, title, slug, attr
            }).then(() => {
                console.log('Category successfully edited!')
                return router.push("/admin/categories")
            })
        } catch(e){
            console.log(e)
        }
    }

    const deleteCategory = async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/delete-category`, {
                id
            }).then(() => {
                console.log('Category successfully deleted!')
                return router.push("/admin/categories")
            })
        } catch(e){
            console.log(e)
        }
    }

    return (
    <Layout title="Редактирование категории" user={props.user}>
            <div className="h2">
                <h2>Edit category: {props.category.title}</h2>
            </div>
            <div className="info_content">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    editCategory()
                    }}>
                    <div className="info_field">
                        <span>Заголовок</span>
                        <input 
                            type="text" 
                            defaultValue={props.category.title}  
                            onChange={e => {setTitle(e.target.value)}} 
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Slug</span>
                        <input 
                            type="text" 
                            defaultValue={props.category.slug} 
                            onChange={e => {setSlug( e.target.value )}}
                            required
                        />
                    </div>
                    <div className="info_field">
                        <span>Attr</span>
                        <input 
                            type="text" 
                            defaultValue={props.category.attr} 
                            onChange={e => {setAttr(e.target.value)}} 
                            required
                        />
                    </div>
                    <button type="submit">Редактировать категорию</button>
                </form>
                <button onClick={deleteCategory}>Удалить категорию</button>
            </div>
    </Layout>
    )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res, params}) => {

        const prisma = new PrismaClient()
    
        let user = req.session.user || null

        const category = await prisma.lang.findUnique({
            where: {
              id: parseInt(params.id),
            },
        })
  
        return {
            props: { 
                user: user,
                category: category
            }
        }
    }
  )