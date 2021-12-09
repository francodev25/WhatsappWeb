import React from 'react'
import Image from 'next/image'
//import { Circle } from 'better-react-spinkit'
import styled from "styled-components"

const myLoader = ({ src }) => {
    return `https://assets.stickpng.com/images/${src}`
  }

const Loading = () => {
    return (
        <Container>
            <div>
                <Image
                    loader={myLoader}
                    src='580b57fcd9996e24bc43c543.png'
                    alt='Whatsapp logo'
                    height={200}
                    width={200}
                />
                ...Loading
            </div>
        </Container>
    )
}

export default Loading


const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
`