
import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head';
import Navs from '../Component/Navigation/Navs/Navs';
import Footer from "../Component/Footer/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const pathname = router.asPath
  return (<>
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
    </Head>
    <div
      className={
        pathname === "/login/" ||
          pathname === "/signup/" ||
          pathname === "/forgot/"
          ? "root_margin"
          : "mainmargin"
      }
    >
      <GoogleOAuthProvider clientId="302922642586-bsv99f5jvhds9eq7vpl5u12la7acte2i.apps.googleusercontent.com">
        {pathname === "/login/" ||
          pathname === "/signup/" ||
          pathname === "/forgot/" ? null : (
          <Navs />
        )}

        <Component {...pageProps} />
        <Footer />
      </GoogleOAuthProvider>
    </div>
  </>
  )
}
