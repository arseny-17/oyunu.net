import Heading from "../components/Heading";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios"
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

export async function getServerSideProps(){

   const options = await axios
   .get('http://localhost:3000/api/get-options')
   .then( (response) => {
      return response.data.options_data
   })

   return {
      props: {
         options_obj: options
      }
   }

}

const Home = (props) => {
   
   const isAmp = useAmp()

   const ampStyle = ``

   return (
      <>
         <Heading amp={isAmp} ampStyle={ampStyle}/>
         <Header amp={isAmp} mainLink={props.options_obj.find(x => x.key === 'mainLink').value}/>
         <div className="content wrapper">
         <h1>1xbet | Güncel Giriş Adresi ve Üyelik Kaydı</h1>
         <p>{ props.options_obj.find(x => x.key === 'sitename').value }</p>

   {isAmp ? (
        <span>amp</span>
      ) : (
         <span>noamp</span>
      )}

   <p>12 yıldır online bahis piyasasında güvenilir bir marka gibi tanınan Onebahis
      ve ya 1xbet liderliğini korumaya devam ediyor. Uluslararası altyapılı bu bahis
         sitesi dünyanın birçok dillerini destekler. Birinciliğini yüksek bahis oranları, 
         en elverişli koşullar, yanlışsız ve hızlı çalışan para çekme ve yatırma sistemleri, 
         fazlasıyla oyun ve çok sayda canlı maç seçimleri sayesinde piyasada başarılı bir
         şekilde kalabiliyor. Ayrıca, giriş, oyun veya para yatırma ve çekme anlarında 
         kafanızda oluşan soruları 7/24 cevaplandıracak müşteri hizmeti de vardır. Bu 
         sevimli bahis ve casino sitesi 18 yaş ve üzeri her kesi güler yüzle karşılar ve
         tüm üyelerine güzel zaman hediye eder.</p>
   <p>Boş zamanınızı internet üzerinden eğlenerek para kazanmaya harcamak daha güzeldir.
      Bunun için 1xbet bahis sitesi size yeni giriş adresleri verir. Giriş adreslerini
         nereden bulacağınızı bilemezseniz online destek ekibi ile iletişime geçebilirsiniz. 
         Neden her zaman giriş adresleri yenilenir diye sorarsanız, bunu size yasal olarak
         anlatabiliriz.</p>
   <div className="contentImg">
      <amp-img width="300" height="500" src="/1xbet-ana-sayfa.png" alt="1xbet" title="1xbet ana sayfa"  layout="fixed"/>
      <figcaption> Ana sayfa görüntüsü</figcaption>
   </div>
   <p>Türkiye yasalarına göre casino yasadışı sayılır, ama eğer bahis ve casino şirketi lisanslıysa, 
      yasalara aykırı değildir. 1xbet bahis sitesi de yasalara uygun olarak Curacao lisansı ile faaliyettedir.
      1xbet ile oyuna başlamadan önce hesap oluşturmanız gerekmektedir. Güncel giriş adresine giriş 
      yaptıktan sonra kayıt işleminizi doğrulayarak üyeliğinizi tamamlayabilirsiniz. Hesabınızın doğrulama 
      işleminden sonra para yatırma ve para çekme işlemi ile birlikte bahis dünyasına giriş yapabilirsiniz.</p>
      <p>Boş zamanınızı internet üzerinden eğlenerek para kazanmaya harcamak daha güzeldir.
      Bunun için 1xbet bahis sitesi size yeni giriş adresleri verir. Giriş adreslerini
         nereden bulacağınızı bilemezseniz online destek ekibi ile iletişime geçebilirsiniz. 
         Neden her zaman giriş adresleri yenilenir diye sorarsanız, bunu size yasal olarak
         anlatabiliriz.</p>
   <p>Türkiye yasalarına göre casino yasadışı sayılır, ama eğer bahis ve casino şirketi lisanslıysa, 
      yasalara aykırı değildir. 1xbet bahis sitesi de yasalara uygun olarak Curacao lisansı ile faaliyettedir.
      1xbet ile oyuna başlamadan önce hesap oluşturmanız gerekmektedir. Güncel giriş adresine giriş 
      yaptıktan sonra kayıt işleminizi doğrulayarak üyeliğinizi tamamlayabilirsiniz. Hesabınızın doğrulama 
      işleminden sonra para yatırma ve para çekme işlemi ile birlikte bahis dünyasına giriş yapabilirsiniz.</p>  
            
   </div>
   <Footer/>
   </>
   )
}

export default Home;