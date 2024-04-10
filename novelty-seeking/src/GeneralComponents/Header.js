import {NavLink} from "react-router-dom";
import image from "../assets/logo.png"

function Header() {

    //<img src={image} alt={"Logo image"}/>

    return null; /*(
        <header className="header-area header-sticky">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            {
                                //<!-- ***** Logo Start ***** -->
                            }
                            <NavLink className="logo" to="/">

                                <h1 className={"text-primary text-muted"}>4134</h1>
                            </NavLink>
                            {
                            //<!-- ***** Logo End ***** -->
                            //<!-- ***** Menu Start ***** -->
                            }
                            <ul className="nav">
                                <li>
                                    <NavLink className="active" to={"/"}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="has-sub">
                                    <a>Photos &amp; Videos</a>
                                    <ul className="sub-menu">
                                        <li><a href="contests.html">Contests</a></li>
                                        <li><a href="contest-details.html">Single Contest</a></li>
                                    </ul>
                                </li>
                                <li><a href="categories.html">Categories</a></li>
                                <li><a href="users.html">Users</a></li>
                            </ul>
                            <div className="border-button">
                                <a id="modal_trigger" href="#modal" className="code-1"><i
                                    className="fa fa-user"></i> Sign In/Up</a>
                            </div>
                            <a className='menu-trigger'>
                                <span>Menu</span>
                            </a>
                            {//<!-- ***** Menu End ***** -->}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );*/
}

export default Header
