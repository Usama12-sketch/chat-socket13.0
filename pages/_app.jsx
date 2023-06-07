import '../styles/globals.css'
import Chatbox from '../components/chat/ChatBox'
import AuthContext from "../utils/Authcontext"
import QueryWrapper from "../utils/QueryWrapper"
export default function App({ Component, pageProps }) {
  return <QueryWrapper>
  <AuthContext>
    <div className=' bg-gray-500 w-full flex h-screen'>

<Chatbox/>
  <Component {...pageProps} />
    </div>

  </AuthContext>
  </QueryWrapper>
}
