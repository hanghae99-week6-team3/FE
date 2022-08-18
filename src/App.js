import "./App.css";
import Router from "./shared/Router";

function App() {
  //배포 환경일때 콘솔에 로그, warning을 안보이게 합니다.
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function () {};
  }

  return <Router />;
}

export default App;
