import styled, {css} from 'styled-components'

const Container = styled.div``

const LoginFormArea = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  width: 416px;
  padding: 50px 30px 25px 30px;
  margin-bottom: 10px;
  border: 1px solid ${({theme}) => theme.colors['gray-200']};
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Image = styled.img``

const P = styled.p`
  color: ${({theme}) => theme.colors['gray-500']};
  text-align: center;

  text-decoration: none;
  em {
    cursor: pointer;
  }
`

const AlertMessage = styled.p`
  color: ${({theme}) => theme.colors.red};
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  word-break: keep-all;
`

const Form = styled.form``

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

const LoginArea = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 86px;
    margin-bottom: 20px;
    border: 1px solid ${theme.colors['gray-200']};

    em {
      color: ${theme.colors.blue};
    }
  `};
`

const DownloadApp = styled.div``

export {Container, LoginFormArea, ImageWrapper, Image, P, AlertMessage, Form, InputWrapper, LoginArea, DownloadApp}
