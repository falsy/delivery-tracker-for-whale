import styled from "@emotion/styled"

const Footer = () => {
  return (
    <$footer>
      &copy;{" "}
      <a href="https://falsy.me" target="_blank">
        Falsy
      </a>
    </$footer>
  )
}

export default Footer

const $footer = styled.footer`
  color: #aaa;
  font-size: 12px;
  font-weight: 500;
  position: sticky;
  top: 100%;
  padding: 0 0 15px 20px;
`
