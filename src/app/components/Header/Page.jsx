import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='container-fluid border-bottom shadow-sm bg-white'>
            <div className="container">
                <header className="header">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/home">
                               <img src={`/dhakadweb/assets/images/dhakadlogo.png`} />
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4 gap-4">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Find Partner</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">About us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Gallery</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Contact us</a>
                                    </li>
                                      <li className="nav-item">
                                         <Link className="nav-link " aria-current="page" href="/myprofile">My profile</Link>
                                    </li>
                                </ul>
                                <div className="d-flex mb-2 mb-lg-0 gap-4">
                                    <Link  href="/registrationform"className='btn btn btn-danger'>Registration</Link>
                                    <Link href='/login' className='btn btn-outline-secondary'>Login</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}

export default Header