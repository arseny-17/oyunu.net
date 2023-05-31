import Heading from "@/components/Heading"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Banner from "@/components/Banner/Banner"
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import clickHandler from "../../helpers/clickHandler"
import { createContext } from "react"

const PageContext = createContext('without provider')

export default function Container({...props}){

    return(
        <>   
        <Heading 
            ampLink={props.link}
            amp={props.amp}    
            ampStyle={props.ampStyle}
            seotitle={props.post.seo_title}
            seodescription={props.post.seo_description}
            content={props.post.content}
            title={props.post.title}
            link={props.post.slug}
            breadcrumbs={props.breadcrumbs}
         />
         <div id="scroll"></div>
         <Header 
            amp={props.amp} 
            mainLink={props.mainLink} 
            mainID={props.mainID} 
            menu={props.menu} 
        />
         <div className="content wrapper">
            <div className="contentMain">
                { props.breadcrumbs ? 
                    <Breadcrumbs 
                        title={props.post.shortTitle} 
                        amp={props.amp} 
                        sitename={props.sitename}
               /> : ''}
               <h1>{props.post.title}</h1>
               <Banner 
                    amp={props.amp} 
                    mainLink={props.mainLink} 
                />
               <div className="content-block" 
                    onClick={clickHandler} 
                    dangerouslySetInnerHTML={{__html: props.rendered}}>
                </div>
            </div>
            <ContentSidebar 
                amp={props.amp} 
                mainLink={props.mainLink}
            />
         </div>
         <Footer 
            amp={props.amp} 
            mainLink={props.mainLink} 
        />      
    </>
    )

}