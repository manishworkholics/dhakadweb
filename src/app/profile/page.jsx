import Link from "next/link";
import Header from '../components/Header/Page'
export default function profile() {
    return (
        <main>
            <Header />
            <div className="sub-bg">
                <h4 className="text-white p-4 text-center font-bold mb-0">Lakhs of Happy Marriages</h4>
            </div>
            <div className="container-fluid content bg-FDFBF7">
                <div className="container">
                    <div className="row py-4">
                        <div className="col-md-3 col-lg-3 col-12 mt-5">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h6 className="mb-2 fw-normal">I am looking for</h6>
                                    <select className="form-select mb-3">
                                        <option>Men</option>
                                        <option>Women</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Age</h6>
                                    <select className="form-select mb-3">
                                        <option>18-30</option>
                                        <option>31-45</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Select Religion</h6>
                                    <select className="form-select mb-3">
                                        <option>Hindu</option>
                                        <option>Sikh</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Location</h6>
                                    <select className="form-select mb-3">
                                        <option>Indore</option>
                                        <option>Pune</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Education</h6>
                                    <select className="form-select mb-3">
                                        <option>B.sc</option>
                                        <option>MBA</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Profession</h6>
                                    <select className="form-select mb-3">
                                        <option>IT Profession</option>
                                        <option>Businessman</option>
                                    </select>
                                    <div className="filter-btn">
                                        <button className="btn bg-D4AF37 text-white px-4 me-3 rounded-3" type="submit">Apply</button>
                                        <button className="btn bg-C8C8C8 text-white px-4 rounded-3" type="submit">Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 col-lg-9 col-12">
                            <div className="filter d-flex justify-content-between">
                                <div className="text d-flex align-items-center">
                                    <h6 className="mb-0">Showing 32 profiles</h6>
                                </div>
                                <div className="search">
                                    <form className="d-flex" role="search">
                                        <input className="form-control rounded-4 border-end-0 rounded-end-0" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn border rounded-4 rounded-start-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg></button>
                                    </form>
                                </div>
                                <div className="sort d-flex align-items-center">
                                    <div className="text">
                                        <h6 className="fw-medium" style={{ width: "60px" }}>Sort By</h6>
                                    </div>
                                    <select className="form-select rounded-4">
                                        <option>More Relative</option>
                                        <option>Women</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="row">

                                <div className="col-lg-4 col-md-4 col-12 mb-3">
                                    <div className="card">
                                        <img src="/dhakadweb/assets/images/muskan.png" className="card-img-top p-1" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold">Muskan Dhakad </h6>
                                            <p className="card-text d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill me-1 text-4CAF50" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg><span className="fw-medium" style={{ fontSize: "13px" }}>Indore, Mp</span></p>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>B.sc</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>29 year old</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>Height: 155 Cms</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>IT Profession</span>
                                            </div>
                                            <hr />
                                            <div className="btn-bottom">
                                                <Link href="/" className="btn bg-4CAF50 text-white px-2 rounded-5 fw-medium" type="submit" style={{ fontSize: "10px" }}>Chat Now</Link>
                                                <button className="btn text-black px-2 rounded-5 mx-2 fw-medium border" type="submit" style={{ fontSize: "10px" }}>Send Interest</button>
                                                <Link href="/profiledetail" className="btn text-black px-2 rounded-5 fw-medium border" type="submit" style={{ fontSize: "10px" }}>More Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-12 mb-3">
                                    <div className="card">
                                        <img src="/dhakadweb/assets/images/muskan.png" className="card-img-top p-1" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold">Muskan Dhakad </h6>
                                            <p className="card-text d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill me-1 text-4CAF50" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg><span className="fw-medium" style={{ fontSize: "13px" }}>Indore, Mp</span></p>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>B.sc</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>29 year old</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>Height: 155 Cms</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>IT Profession</span>
                                            </div>
                                            <hr />
                                            <div className="btn-bottom">
                                                <Link href="/" className="btn bg-4CAF50 text-white px-2 rounded-5 fw-medium" type="submit" style={{ fontSize: "10px" }}>Chat Now</Link>
                                                <button className="btn text-black px-2 rounded-5 mx-2 fw-medium border" type="submit" style={{ fontSize: "10px" }}>Send Interest</button>
                                                <Link href="/profiledetail" className="btn text-black px-2 rounded-5 fw-medium border" type="submit" style={{ fontSize: "10px" }}>More Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-12 mb-3">
                                    <div className="card">
                                        <img src="/dhakadweb/assets/images/muskan.png" className="card-img-top p-1" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold">Muskan Dhakad </h6>
                                            <p className="card-text d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill me-1 text-4CAF50" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg><span className="fw-medium" style={{ fontSize: "13px" }}>Indore, Mp</span></p>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>B.sc</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>29 year old</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>Height: 155 Cms</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>IT Profession</span>
                                            </div>
                                            <hr />
                                            <div className="btn-bottom">
                                                <Link href="/" className="btn bg-4CAF50 text-white px-2 rounded-5 fw-medium" type="submit" style={{ fontSize: "10px" }}>Chat Now</Link>
                                                <button className="btn text-black px-2 rounded-5 mx-2 fw-medium border" type="submit" style={{ fontSize: "10px" }}>Send Interest</button>
                                                <Link href="/profiledetail" className="btn text-black px-2 rounded-5 fw-medium border" type="submit" style={{ fontSize: "10px" }}>More Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-12 mb-3">
                                    <div className="card">
                                        <img src="/dhakadweb/assets/images/muskan.png" className="card-img-top p-1" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold">Muskan Dhakad </h6>
                                            <p className="card-text d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill me-1 text-4CAF50" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg><span className="fw-medium" style={{ fontSize: "13px" }}>Indore, Mp</span></p>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>B.sc</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>29 year old</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>Height: 155 Cms</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>IT Profession</span>
                                            </div>
                                            <hr />
                                            <div className="btn-bottom">
                                                <Link href="/" className="btn bg-4CAF50 text-white px-2 rounded-5 fw-medium" type="submit" style={{ fontSize: "10px" }}>Chat Now</Link>
                                                <button className="btn text-black px-2 rounded-5 mx-2 fw-medium border" type="submit" style={{ fontSize: "10px" }}>Send Interest</button>
                                                <Link href="/profiledetail" className="btn text-black px-2 rounded-5 fw-medium border" type="submit" style={{ fontSize: "10px" }}>More Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-12 mb-3">
                                    <div className="card">
                                        <img src="/dhakadweb/assets/images/muskan.png" className="card-img-top p-1" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold">Muskan Dhakad </h6>
                                            <p className="card-text d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill me-1 text-4CAF50" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg><span className="fw-medium" style={{ fontSize: "13px" }}>Indore, Mp</span></p>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>B.sc</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>29 year old</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>Height: 155 Cms</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>IT Profession</span>
                                            </div>
                                            <hr />
                                            <div className="btn-bottom">
                                                <Link href="/" className="btn bg-4CAF50 text-white px-2 rounded-5 fw-medium" type="submit" style={{ fontSize: "10px" }}>Chat Now</Link>
                                                <button className="btn text-black px-2 rounded-5 mx-2 fw-medium border" type="submit" style={{ fontSize: "10px" }}>Send Interest</button>
                                                <Link href="/profiledetail" className="btn text-black px-2 rounded-5 fw-medium border" type="submit" style={{ fontSize: "10px" }}>More Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-12 mb-3">
                                    <div className="card">
                                        <img src="/dhakadweb/assets/images/muskan.png" className="card-img-top p-1" alt="..." />
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold">Muskan Dhakad </h6>
                                            <p className="card-text d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill me-1 text-4CAF50" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg><span className="fw-medium" style={{ fontSize: "13px" }}>Indore, Mp</span></p>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>B.sc</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>29 year old</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>Height: 155 Cms</span>
                                                <span className="px-1 bg-FFECAE text-dark fw-medium rounded-1" style={{ fontSize: "9px" }}>IT Profession</span>
                                            </div>
                                            <hr />
                                            <div className="btn-bottom">
                                                <Link href="/" className="btn bg-4CAF50 text-white px-2 rounded-5 fw-medium" type="submit" style={{ fontSize: "10px" }}>Chat Now</Link>
                                                <button className="btn text-black px-2 rounded-5 mx-2 fw-medium border" type="submit" style={{ fontSize: "10px" }}>Send Interest</button>
                                                <Link href="/profiledetail" className="btn text-black px-2 rounded-5 fw-medium border" type="submit" style={{ fontSize: "10px" }}>More Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}