import Heading from "@/components/Heading";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import Link from "next/link";
import getCSS from "../../helpers/generateCSS";

const prisma = new PrismaClient()

export const config = { amp: 'hybrid' }

const Sitemap = (props) => {
   
    const isAmp = useAmp()
 
    return (
       <>
          <Heading 
             amp={isAmp}    
             ampStyle={props.ampStyle}
             seotitle='Title Sitemap'
             seodescription="Description sitemap"
          />
          <div id="scroll"></div>
          
          <div className="contentMapWrap">
             <div className="contentMap">
                <h1>Sitemap</h1>
            
                <div className="sitemapLinks">
                { props.posts.map(postItem =>(
                    <>
                        <Link href={postItem.slug}>
                            {postItem.title}
                        </Link>
                    </>
                    )) 
                }
                </div>

             </div>
 
            
 
          </div>
       </>
    )
 }
 
 export default Sitemap;

 export const getServerSideProps = async ({req, res}) => {

        const options = await axios
            .get('http://localhost:3000/api/get-options')
            .then( (response) => {
            return response.data.options_data
        })

        const posts = await prisma.post.findMany() || null

        const style = getCSS()

        return {
            props: { 
             posts: posts,
             options_obj: options,
             ampStyle: style
            }
        }

        
    }