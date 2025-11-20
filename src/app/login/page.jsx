import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'

const Login = () => {
    return (
        <div className='login-page bg-FDFBF7'>
            <div className="">
                <Header />
            </div>
            <div className="login-content py-5">
                <div className="container">
                    <div className="row">
                        {/* Login-Form */}
                        <div className="col-12 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto mb-4">
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">
                                    <div className="login-form">
                                        <div className="text-center">
                                            <img src="/assets/images/dhakad-logo.png" alt="" className="mb-4" />
                                            <h5 className='text-center mb-4 fw-medium'>Welcome back! Please Login</h5>
                                        </div>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label text-6B6B6B">Mobile No. / Email ID</label>
                                                <input type="text" className="form-control" placeholder='Enter Mobile No. / Email ID' />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label text-6B6B6B">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' />
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Stay Logged in</label>
                                                </div>
                                                <div className="mb-3">
                                                    <a href="#" className='text-decoration-none text-D4AF37'>Forgot Password?</a>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn bg-D4AF37 w-100 text-white mb-2">Login</button>
                                            <p className='text-center text-6B6B6B mb-2'>or</p>
                                            <Link
                                                href='/enterotp'
                                                className="btn btn-danger w-100 mb-3">Login with OTP</Link>
                                        </form>
                                        <div className="text-center">
                                            <p className='mb-0 text-6B6B6B'>New to Dhakad Matrimony? <a href="#" className='text-6B6B6B fw-semibold text-decoration-none'> Sign Up Free</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download-App */}
                        <div className="col-12">
                            <div className="card border-0 rounded-5 bg-FFEEEE mt-5">
                                <div className="card-body p-5 mt-4">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                                            <button className="btn btn-outline-warning rounded-pill bg-FFF1C4 text-dark mb-3 px-4">Download</button>
                                            <h3 className='fw-semibold mb-3'>Dhakar Matrimony
                                                <span className="text-danger"> Mobile App</span>
                                            </h3>
                                            <p className='mb-4 text-6B6B6B'>Access quick & simple search, instant updates and a great user experience on your phone. Download our app which are the best matrimony app for dhakar samaj.</p>
                                            <div className="row">
                                                <div className="col-12 col-lg-9 me-auto ">
                                                    <div className="card border-0 rounded-5 bg-white shadow p-3 w-fit-content">
                                                        <div className="row">
                                                            <p className="mb-4 text-6B6B6B text-center">Point your phone camera at the QR code or use one of the download links below</p>
                                                            <div className="col-12 col-lg-6 mb-lg-0 mb-4">
                                                                <div className="text-center">
                                                                    <img src="/assets/images/download-barcode.png" alt="qr-code" className='w-75' />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                                                <img src="/assets/images/appstore.png" alt="app-store" className='mb-2 w-75' />
                                                                <img src="/assets/images/playstore.png" alt="google-play" className='w-75' />
                                                            </div>
                                                            <p className="mt-4 text-6B6B6B text-center">Or
                                                                <span className="text-danger fw-medium"> Get Download </span>
                                                                on yur SMS/Email
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="">
                                                <img src="/assets/images/download-app-img.png" alt="" className="w-100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login