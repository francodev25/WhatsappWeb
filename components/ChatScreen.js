import { Avatar } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons'
import styled from 'styled-components'

const ChatScreen = () => {
    return (
        <Container>
            <Header>
                <Avatar/>

                <HeaderInformation>
                    <h3>Rec Email</h3>
                    <p>Last seen...</p>
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
                <EndOfMessage/>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticon/>
                <Input value={''} onChange={e => console.log(e)} />
                <button hidden ></button>
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