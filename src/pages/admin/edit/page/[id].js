import Layout from "@/components/admin/Layout"
import { withSessionSsr } from '../../../lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import React, { use, useEffect } from "react"
import axios from 'axios'
import { useRouter } from "next/router"

const prisma = new PrismaClient()

export default function Pages(props) {

    useEffect(() => {

        console.log('props', props.post.content)
        
        const Editorjs = require('@editorjs/editorjs')
        const Header = require('@editorjs/header')
        const List = require('@editorjs/list')
        const Table = require('@editorjs/table')
        const Raw = require('@editorjs/raw')
        const ImageTool = require('@editorjs/image')
        const EditorjsColumns = require('@calumk/editorjs-columns')

        let column_tools = {
            header: Header,
        }

        const editor = new Editorjs({
           
            holder: 'editorjs',
            tools: { 
                columns : {
                    class : EditorjsColumns,
                    config : {
                      tools : column_tools
                    }
                },
                header: Header, 
                table: Table,
                raw: Raw,
                list: List,
                image: {
                    class: ImageTool,
                    config: {
                        uploader : {
                            async uploadByFile(file){
            
                                const data = new FormData()
                                data.append('filesData', file)
            
                                const req = await fetch(`http://localhost:3000/api/fileupload-post`, {
                                    method: 'POST',
                                    body: data
                                })
            
                                const res = await req.json()
            
                                return res
                            }
                        },
                        field: 'files',
                        captionPlaceholder: 'Caption | alt | title'
                    }
                }
            }, 
            onReady: () => {
                console.log('Editor.js is ready to work!')
                editor.render(JSON.parse(props.post.content))
            },
            onChange: (api, event) => {
                //console.log('Now I know that Editor\'s content changed!', event)
                editor.save().then((outputData) => {
                    console.log('Article data: ', outputData)
                    setContent(JSON.stringify(outputData))
                }).catch((error) => {
                    console.log('Saving failed: ', error)
                })
            },
            autofocus: true,
            placeholder: 'Let`s write an awesome story!',
        })
    
    }, [])

    const matches = {" ":"-","Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"Y","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"y","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

    const transliterate = (word) => {
        return word.split('').map(function (char) { 
            return matches[char] || char 
        }).join("")
    }

    const [title, setTitle] = React.useState(props.post.title)
    const [content, setContent] = React.useState('')
    const [category, setCategory] = React.useState(parseInt(props.post.language_id))
    const [slug, setSlug] = React.useState(props.post.slug)
    const id = props.post.id

    const router = useRouter()
 
    const editPost = async () => {
        try{
            await axios.post('http://localhost:3000/api/edit-post', {
                id, title, content, category, slug
            }).then(() => {
                console.log('success')
            })
        } catch(e){
            console.log(e)
         }
    }

    const deletePost = async () => {
        try{
            await axios.post('http://localhost:3000/api/delete-post', {
                id
            }).then(() => {
                console.log('Page successfully deleted!')
                return router.push("/admin/pages")
            })
        } catch(e){
            console.log(e)
        }
    }


    return (
        <Layout title="Редактирование страницы" user={props.user}>
                <div className="h2">
                    <h2>Редактирование страницы</h2>
                </div>
                <div className="info_content">
                    <form onSubmit={ (e) => {
                        e.preventDefault()
                        editPost()
                    }}>
                        <div className="info_field">
                            <span>Заголовок</span>
                            <input type="text" required 
                                defaultValue={props.post.title} 
                                onChange={e => {
                                    setTitle(e.target.value)
                                    setSlug( transliterate(e.target.value).toLowerCase() )
                                }} 
                            />
                        </div>
                        <div id="editorjs"></div>
                        <div className="info_field">
                            <span>Slug</span>
                            <input 
                                type="text" 
                                defaultValue={props.post.slug} 
                                required onChange={e => {
                                setSlug( e.target.value )
                            }}/>
                        </div>
                        <div className="info_field">
                            <span>Категория</span>
                            <select onChange={e => setCategory( parseInt(e.target.value))} required>
                                <option defaultValue={props.current_cat.id}>{props.current_cat.title}</option>
                                { props.categories.map(cat =>(
                                    <option value={cat.id}>{cat.title}</option>
                                    )) 
                                }
                            </select>
                        </div>
                        <button type="submit">Редактировать страницу</button>
                    </form>
                    <button onClick={deletePost}>Удалить страницу</button>
                </div>
        </Layout>
        )
    }

    export const getServerSideProps = withSessionSsr(
        
        async ({req, res, params}) => {
        
            let user = req.session.user || null

            const post = await prisma.post.findUnique({
                where: {
                  id: parseInt(params.id),
                },
            })

            const categories = await prisma.lang.findMany() || null

            const current_cat = await prisma.lang.findUnique({
                where: {
                  id: parseInt(post.language_id),
                },
            })
    
            return {
                props: { 
                    user: user,
                    categories: categories,
                    post: post,
                    current_cat: current_cat
                }
            }
        }
    )