import Button from "../Button";
import ImageWrap from "../ImageWrap"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const ContentSidebar = () =>  {

    const context = useContext({...PageContext})
    const {amp, mainLink, post} = context

    const brandClick = function(){
        location.href=`${mainLink}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${mainLink}')`

    return (
        <div className="contentSidebar">
            <p className="appName">Android veya iOS için 1xBet uygulamasını ücretsiz indirin!</p>
            <div className="appImg">
                <ImageWrap 
                    amp={amp} 
                    imgsrc="/app.png" 
                    imgalt="İndir 1xBet" 
                    imgwidth="170" 
                    imgheight="200"
                /> 
            </div>
            <div className="appItem">
                <Button 
                    amp={amp} 
                    link={mainLink}
                    areaLabel="Android'i indir"
                    split='buttonAndroid'
                    buttonStyle={`btn-app-android-${post.page_key} btn-android`}/>
                <ImageWrap 
                    amp={amp} 
                    imgsrc="/android.png" 
                    imgalt="android'i indir" 
                    imgwidth="25" 
                    imgheight="25"
                /> 
                <div className="appInfo">
                    <span className="appInfoTitle">Android için uygulamayı indirin</span>
                    <span className="appInfoSubtitle">158003 yüklemeler</span>
                </div>
            </div>
            <div className="appItem">
                <Button 
                    amp={amp} 
                    link={mainLink}
                    areaLabel="Android'i indir"
                    split='buttonAndroid'
                    buttonStyle={`btn-app-ios-${post.page_key} btn-ios`}/>
                <ImageWrap 
                    amp={amp} 
                    imgsrc="/ios.png" 
                    imgalt="ios'u indirin" 
                    imgwidth="25" 
                    imgheight="25"
                /> 
                <div className="appInfo">
                    <span className="appInfoTitle">İOS için uygulamayı indirin</span>
                    <span className="appInfoSubtitle">3560584 yüklemeler</span>
                </div>
            </div>

        
            
        </div>
    )

}

export default ContentSidebar;