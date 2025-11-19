import React from 'react'

const Header = () => {
    return (
        <div className='container-fluid'>
            <div className="container">
                <header className="bg-white">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <img src="/assets/images/dhakad-logo.png" alt="logo" className="" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4 gap-4">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
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
                                </ul>
                                <div className="d-flex mb-2 mb-lg-0 gap-4">
                                    <button className='btn btn btn-danger'>Registration</button>
                                    <button className='btn btn-outline-secondary'>Login</button>
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