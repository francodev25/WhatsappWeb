import styled from 'styled-components'
import Head from 'next/head'
import { doc, getDocs, getDoc, collection, query, orderBy } from "firebase/firestore";
import { auth , db } from '../../firebase'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'

function Chat({chat,messages}) {
    const [user] = useAuthState(auth);


    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users,user)}</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context){
     const chatRef = doc(db,'chats',context.query.id);
     const messagesRef = collection(db,`chats/${context.query.id}/messages`);
     
     
     const q = query(messagesRef, orderBy("timestamp","asc"));
     
     const querySnapshot = await getDocs(q);
     
     const messages = querySnapshot.docs.map((doc)=>({
         id:doc.id,
         ...doc.data()
     })).map((messages)=>({
         ...messages,
         timestamp: messages.timestamp.toDate().getTime(),
     }));

     const chatRes = await getDoc(chatRef);
     const chat = {
         id: chatRes.id,
         ...chatRes.data()
     }

     return {
         props: {
             messages: JSON.stringify(messages),
             chat: chat
         }
     }
     
    }

const Container = styled.div`
    display: flex;
`
const ChatContainer = styled.div`
    flex:1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar{
        display: none;
    }
    --ms-overflow-style:none;
    scrollbar-width: none;
`