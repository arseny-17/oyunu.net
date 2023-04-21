import ScrollToTop from "../ScrollToTop";

let year = new Date().getFullYear()

const Footer = (props) =>  {

    console.log('footer', props)

    return (
        <footer className="footer">
            <div className="footerInner wrapper">
                <span className="copyright">© Copyright {year}</span>
            </div>
            <ScrollToTop amp={props.amp} />
        </footer>
    )

}

export default Footer;
