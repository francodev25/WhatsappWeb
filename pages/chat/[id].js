import styled from 'styled-components'
import Head from 'next/head'
import { Avatar } from '@material-ui/core'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'


function Chat() {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen/>
            </ChatContainer>
        </Container>
    )
}

export default Chat


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