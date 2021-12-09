import { useState } from 'react'
import { Avatar } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import { serverTimestamp, collection, query, orderBy,updateDoc,where, addDoc,doc } from 'firebase/firestore'
import Message from './Message'
import TimeAgo from 'timeago-react'

const ChatScreen = ({chat,messages}) => {

    const [input, setInput] = useState('')
    const [user] = useAuthState(auth)
    const router = useRouter();

    const messagesRef = collection(db,`chats/${router.query.id}/messages`);
    const q = query(messagesRef, orderBy("timestamp","asc"));

    const [messagesSnapshot] = useCollection(q);

    
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        }
        else{
            return JSON.parse(messages).map(message =>(
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const userRecipientQuery = query(collection(db,'users'), where("email","==", getRecipientEmail(chat.users,user)));

    const [recipientSnapshot] = useCollection(userRecipientQuery)

    const sendMessage = async(e)=>{
        e.preventDefault();

        //Update the lastSeen
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { lastSeen: serverTimestamp() });
        await addDoc(messagesRef,{
            message: input,
            user: user.email,
            photoURL: user.photoURL,
            timestamp: serverTimestamp()
        })
        
        setInput('');
    }
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users,user);

    return (
        <Container>
            <Header>
                {
                    recipient ? (
                        <Avatar src={recipient?.photoURL}/>
                    ):
                    (
                        <Avatar>
                            {recipientEmail[0]}
                        </Avatar>
                    )
                }


                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {' '}
                            {recipient?.lastSeen?.toDate() ? 
                                (
                                    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                                ):
                                'Unavailable'
                            }
                        </p>
                    ):
                    
                        (
                            <p>Loading Last Active ...</p>
                        )
                    }
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {/** // TODO: Show messages  */}
                {showMessages()}
                <EndOfMessage/>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticon/>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type='submit' onClick={sendMessage}></button>
                <Mic/>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`

const Header = styled.div`
    position:sticky;
    background-color: white;
    z-index:100;
    top:0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex:1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color:gray;
    }
`
const HeaderIcons = styled.div``

const MessageContainer = styled.div`
    padding:30px;
    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
    min-height: 90vh;
`

const EndOfMessage = styled.div``

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    bottom:0;
    background-color: white;
    position:sticky;
    z-index:100;
`

const Input = styled.input`
    flex:1;
    outline:0;
    border:none;
    border-radius:10px;
    background-color: whitesmoke;
    padding: 20px;
    margin: 0 15px;

`