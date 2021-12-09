import { Avatar, Button, IconButton } from '@material-ui/core'
import {
  Search as SearchIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, addDoc  } from 'firebase/firestore'
import { auth, db } from '../firebase'
import * as EmailValidator from 'email-validator'
import Chat from './Chat'

function Sidebar() {
  const [user] = useAuthState(auth)
  const userChatRef = collection(db, 'chats')
  const userQuery = query(
    userChatRef,
    where('users', 'array-contains', user.email)
  )
  const [chatsSnapshot] = useCollection(userQuery)

  const createChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    )

    if (!input) return null

    //isEmail                          &&   
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      addDoc(collection(db, "chats"), {
        users:[user.email , input],
      });
    }
  }

  const chatAlreadyExists = (recipientEmail) => (
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    )
  );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats' />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/**List of Chats*/
        chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        ))
      }
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  width: 290px;
  border-right: 3px solid whitesmoke;
  flex:.25;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar{
        display: none;
    }
    --ms-overflow-style:none;
    scrollbar-width: none;
`

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`
