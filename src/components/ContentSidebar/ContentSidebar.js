import Image from "next/image";
import Button from "../Button";

const ContentSidebar = (props) =>  {

    const brandClick = function(){
        location.href=`${props.mainLink}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${props.mainLink}')`

    return (
        <div className="contentSidebar">
            <p className="appName">Download the 1xBet app for Android or iOS for free!</p>
            <div className="appImg">
                <Image src="/app.png" alt="Download 1xBet" width={170} height={200}/>
            </div>
            <div className="appItem">
                <Button 
                    amp={props.amp} 
                    link={props.mainLink}
                    areaLabel="Download Android"
                    split='buttonAndroid'
                    buttonStyle="btn-android"/>
                <Image src="/android.png" alt="Logo 1xBet" width={25} height={25}/> 
                <div className="appInfo">
                    <span className="appInfoTitle">Download application for Android</span>
                    <span className="appInfoSubtitle">158003 downloads</span>
                </div>
            </div>

        
            
        </div>
    )

}

export default ContentSidebar;