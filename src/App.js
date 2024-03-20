import "./App.css";
import React, { useEffect } from "react";
import Navbar1 from "./Components/Navbar/Navbar1";
import AllRoutes from "./Routes/AllRoutes";
import AllRoutesAd from "./Routes/AllRoutesAd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import { Navbar, FooterAdmin, Sidebar, ThemeSettings} from "./Components-admin";

function App() {
  const data=JSON.parse(localStorage.getItem("data"));

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

   useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
    // localStorage.removeItem("data");
  if(data!==null)
  {if(data.data.role==="ADMIN" ||data.data.role==="INTERVIEWER" ||data.data.role==="RECRUITER" )
  return(
    
    <BrowserRouter>
     <Provider store={store}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              {/* <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button> */}
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
             <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>
            <div>
              {/* {themeSettings && <ThemeSettings />} */}
              <AllRoutesAd />
            </div>
            <FooterAdmin />
          </div>
        </div>
        </Provider>
      </BrowserRouter>
  )}
  return (
  <BrowserRouter>
    <Provider store={store}>
      <div className='App'>
        <Navbar1 />
        {/* <HomePage /> */}
        <AllRoutes />
        <Footer />
      </div>
    </Provider>
      </BrowserRouter>
  );
}

export default App;
