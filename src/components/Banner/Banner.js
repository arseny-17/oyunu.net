import Button from "../Button"

export default function Banner(props){

    return (
        <div 
            className="banner"
            style={{
                background: `url(/uploads/img/webp/banner-1x.jpg.webp)no-repeat`, 
                backgroundPosition: `center`,
                backgroundSize: `cover`
            }}>
            <Button 
                text="Bonus almak"
                amp={props.amp} 
                link={props.mainLink}
                areaLabel="Bonus almak"
                split="buttonBanner"
                buttonStyle="banner-btn"/>
        </div>
      
    )

}