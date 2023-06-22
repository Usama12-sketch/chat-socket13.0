import '../styles/globals.css'
import Chatbox from '../components/chat/ChatBox'
import Profile from '@/components/Profile'
import AuthContext from "../utils/Authcontext"
import QueryWrapper from "@/utils/QueryWrapper"
export default function App({ Component, pageProps }) {
  return <QueryWrapper>
  <AuthContext>
    <div className='flex-col pb-10   justify-start w-full md:h-[40rem] h-screen lg:h-[62rem] '>

<Profile/>
      <ol className='bg-gray-500  w-full flex h-full  overflow-y-scroll-hidden'>

<Chatbox/>
  <Component {...pageProps} />
      </ol>
    </div>

  </AuthContext>
  </QueryWrapper>
}
