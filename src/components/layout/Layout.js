import Footer from "../footer/Footer"
import Header from "../navbar/Header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
