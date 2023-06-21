import React, { useEffect } from "react"
import Header from "../../components/header/Header"
import EmailList from "../../components/emailList/EmailList"
import Footer from "../../components/footer/Footer"
import Featured from "../../components/featured/Featured"
import "./Home.scss"
import PropertyList from "../../components/propertylist/PropertyList"
import TopVisited from "../../components/topvisited/Top_Visited"
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header type="show" />
      <div className="herosection">
        <Featured />
        <h2 className="hs-title">Browse by property type</h2>
        <PropertyList />
        <h2 className="hs-title">Top visited</h2>
        <TopVisited />
      </div>

      <Footer />
    </>
  )
}

export default Home
