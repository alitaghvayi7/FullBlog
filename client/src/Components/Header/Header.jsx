import "./header.css";

export default function Header() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (<div className="Header">
    <div className="headerTitles">
        <span className="headerSmallTitle">React & Node</span>
        <span className="headerLargeTitle">Blog</span>
    </div>
    <div className="headerImages">
        <img className="headerLandingImage" src={PF+"landing1.jpeg"} alt="" />
    </div>
  </div>);
}
