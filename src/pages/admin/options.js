import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '../lib/config/withSession'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import React, { use } from "react"

const prisma = new PrismaClient()

export default function Options(props) {

  const [sitename, setSitename] = React.useState(props.options.find(x => x.key === 'sitename').value)
  const [mainlink, setMainLink] = React.useState(props.options.find(x => x.key === 'mainLink').value)
  const [mainlang, setMainLang] = React.useState(props.options.find(x => x.key === 'mainLang').value)

  const updateOption = async(key, value) => {
    console.log(key, value)
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/update-option`, {
            key, value
        }).then(() => {
            console.log(`Option ${key} successfully edited with value ${value}!`)
        })
    } catch(e){
        console.log(e)
    }
  }

  return (
   <Layout title="Страница опций" user={props.user}>

        <h2>Main information about site</h2>
        <form action="">
            <div className="info_field">
                <span>Название сайта</span>
                <input 
                    type="text" 
                    defaultValue={sitename}  
                    onChange={e => {
                        setSitename(e.target.value)
                        updateOption('sitename', e.target.value)
                    }}
                />
            </div>
            <div className="info_field">
                <span>Ссылка на рекла</span>
                <input 
                    key="2"
                    type="text" 
                    defaultValue={mainlink}
                    onChange={e => {
                        setMainLink(e.target.value)
                        updateOption('mainLink', e.target.value)
                    }}
                />
            </div>
            <div className="info_field">
                <span>Язык сайта</span>
                <select onChange={e => {
                    setMainLang( parseInt(e.target.value))
                    updateOption('mainLang', e.target.value)
                }} required>
                    <option 
                        key={props.currentLangObject.id}
                        defaultValue={props.currentLangObject.id}>
                        {props.currentLangObject.title}
                    </option>
                    { props.categories.map(cat =>(
                        <option value={cat.id} key={cat.id}>{cat.title}</option>
                        )) 
                    }
                    </select>
            </div>
        </form>
   </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
    
    async ({req, res}) => {
    
        let user = req.session.user || null

        const categories = await prisma.lang.findMany() || null
        const options = await prisma.options.findMany() || null
        const currentLang = await prisma.options.findUnique({
            where: {
              key: 'mainLang',
            },
        })
        
        const currentLangObject = await prisma.lang.findUnique({
            where: {
              id: parseInt(currentLang.value),
            },
        })
  
        return {
            props: { 
                user: user,
                options: options,
                categories: categories,
                currentLangObject: currentLangObject || {}
            }
        }
    }
  )