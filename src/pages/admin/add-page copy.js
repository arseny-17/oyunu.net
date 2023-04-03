import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '../lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import { Editor } from "@tinymce/tinymce-react"
import React, { use } from "react"
import axios from 'axios'

const prisma = new PrismaClient()

export default function Pages(props) {

const matches = {" ":"-","Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"Y","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"y","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

const transliterate = (word) => {
  return word.split('').map(function (char) { 
    return matches[char] || char 
  }).join("")
}

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [slug, setSlug] = React.useState('')
 
  const addPost = async () => {
        try{
            await axios.post('http://localhost:3000/api/add-post', {
                title, content, category, slug
            }).then(() => {
                console.log('success')
            })
        } catch(e){
            console.log(e)
        }
    }

const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent())
    setContent(e.target.getContent())
}

  return (
   <Layout title="Создание новой страницы" user={props.user}>
        <div className="h2">
            <h2>Add new page</h2>
        </div>
        <div className="info_content">
            <form onSubmit={ (e) => {
                e.preventDefault()
                addPost()
            }}>
                <div className="info_field">
                    <span>Заголовок</span>
                    <input type="text" required onChange={e => {
                        setTitle(e.target.value)
                        setSlug( transliterate(e.target.value).toLowerCase() )
                    }} />
                </div>
                <div className="info_field">
                    <span>Slug</span>
                    <input type="text" value={slug} required onChange={e => {
                        setSlug( e.target.value )
                    }}/>
                </div>
                <div className="info_field">
                    <span>Контент</span>
                    <Editor
                        tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                        value={props.content}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            ],
                            toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                            content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onChange={handleEditorChange}
                        />
                </div>
                <div className="info_field">
                    <span>Категория</span>
                    <select onChange={e => setCategory( parseInt(e.target.value))} required>
                        <option>Не выбрано</option>
                        { props.categories.map(cat =>(
                            <option value={cat.id}>{cat.title}</option>
                            )) 
                        }
                    </select>
                </div>
                <button type="submit">Создать страницу</button>
            </form>
        </div>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null

        const categories = await prisma.lang.findMany() || null
  
        return {
            props: { 
                user: user,
                categories: categories
            }
        }
    }
  )