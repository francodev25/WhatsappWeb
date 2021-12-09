import { Button } from "@material-ui/core"
import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"
import {auth,provider} from '../firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const myLoader = ({ src }) => {
    return `https://assets.stickpng.com/images/${src}`
  }

function login(){

    const signIn = () =>{
    
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <LogoContainer>

                    <Image 
                        loader={myLoader}
                        src='580b57fcd9996e24bc43c543.png'
                        alt='Whatsapp logo'
                        height={200}
                        width={200}
                    />
                </LogoContainer>
                <Button onClick={signIn}>Sign In with Google</Button>
            </LoginContainer>
            
        </Container>
    )
}

export default login


const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;

`
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const LogoContainer = styled.div`
    height:200px;
    width:200px;
    margin-bottom:50px;
`