import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'

const enterotp = () => {
    return (
        <div className='otp-page bg-FDFBF7' style={{minHeight:'100vh'}}>
            <div className="">
                <Header />
            </div>
            <div className="otp-content py-5">
                <div className="container">
                    <div className="row">
                        {/* Login-Form */}
                        <div className="col-12 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mx-auto mb-4">
                            <h6 className="">Basic Details</h6>
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">
                                    <div className="login-form">
                                        <div className="text-center">
                                            <img src="/assets/images/otp-icon.png" alt="" className="mb-4" />
                                            <h6 className='text-center mb-4 fw-medium'>Please enter 4-digit code sent to +9589465655</h6>
                                        </div>
                                        <form>
                                            <div className="mb-3">
                                                <div className="otp-inputs d-flex justify-content-center gap-3">
                                                    <input type="text" className="form-control border-bottom border-top-0 border-end-0 border-start-0 rounded-0 border-danger border-2 shadow-none" />
                                                    <input type="text" className="form-control border-bottom border-top-0 border-end-0 border-start-0 rounded-0 border-danger border-2 shadow-none" />
                                                    <input type="text" className="form-control border-bottom border-top-0 border-end-0 border-start-0 rounded-0 border-danger border-2 shadow-none" />
                                                    <input type="text" className="form-control border-bottom border-top-0 border-end-0 border-start-0 rounded-0 border-danger border-2 shadow-none" />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <p className='mb-1'>Didn`t receive the OTP? </p>
                                                <p className='fw-medium'>
                                                    <span className="text-danger"> Resent OTP </span> 24sec
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <Link
                                                    href="/registrationform"
                                                    className="btn bg-D4AF37 w-75 text-white mb-2">Submit</Link>
                                            </div>
                                        </form>
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

export default enterotp