import { Outlet } from "react-router-dom"
import AuthHeader from "./template/AuthHeader"
import AuthFooter from "./template/AuthFooter"
import ScrollToTop from "../common/ScrollToTop"

export default function PublicLayout() {
  return (
    <>
      <ScrollToTop>
      <AuthHeader/>
        <Outlet/>
      <AuthFooter/>
      </ScrollToTop>
    </>
  )
}
