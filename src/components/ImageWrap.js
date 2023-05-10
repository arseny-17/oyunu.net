import Image from "next/image";

const ImageWrap = (props) => {

    return(

        props.amp ? (
            <amp-img 
                src={props.imgsrc}
                alt={props.imgalt}
                width={props.imgwidth}
                height={props.imgheight}
            >
            
            </amp-img>
        ) : (
            <Image 
                src={props.imgsrc}
                alt={props.imgalt}
                width={props.imgwidth}
                height={props.imgheight}
            />
        )

    )

}

export default ImageWrap 

