import Link from "next/link";
import Header from '../components/Header/Page'
export default function ProfileDetail() {
    return (
        <main>
            <Header />
            <div className="sub-bg">
                <h4 className="text-white p-4 text-center font-bold mb-0">Lakhs of Happy Marriages</h4>
            </div>
            <div className="container-fluid content bg-FDFBF7">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-md-4 px-3">
                            <div className="card rounded-3">
                                <img src="/dhakadweb/assets/images/priya.png" className="card-img-top" alt="..." />
                                <div className="btn-bottom">
                                    <Link href="/" className="btn bg-danger text-white fw-medium rounded-top-0 rounded-end-0 p-3" style={{ fontSize: "15px" }}>Chat Now</Link>
                                    <Link href="/" className="btn text-white fw-medium rounded-0 bg-D4AF37 p-3" style={{ fontSize: "15px" }}>Send Interest</Link>
                                    <Link href="/ProfileDetail" className="btn text-black fw-medium rounded-top-0 rounded-start-0 p-3 bg-E3E3E3" style={{ fontSize: "15px" }}>Add Shortlist</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 px-4">
                            <div className="details">
                                <h2 className="fw-semibold">Priya Dhakad</h2>
                            </div>
                            <div className="detail-card d-flex justify-content-between">
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                                <div className="card"></div>
                            </div>
                            <hr />
                            <div className="about">
                                <h3>ABOUT</h3>
                                <p className="fw-medium">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
                            </div>
                            <hr />
                            <div className="gallery">
                                <h3 className="mb-3">PHOTO GALLERY</h3>
                                <div className="row justify-content-between">
                                    <div className="col-md-3">
                                        <img src="/dhakadweb/assets/images/gallery.png" alt="" srcset="" className="w-100" />
                                    </div>
                                    <div className="col-md-3">
                                        <img src="/dhakadweb/assets/images/gallery1.png" alt="" srcset="" className="w-100" />
                                    </div>
                                    <div className="col-md-3">
                                        <img src="/dhakadweb/assets/images/gallery2.png" alt="" srcset="" className="w-100" />
                                    </div>
                                    <div className="col-md-3">
                                        <img src="/dhakadweb/assets/images/gallery3.png" alt="" srcset="" className="w-100" />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="contact">
                                <h3 className="mb-3">CONTACT INFO</h3>
                                <div className="icon-text d-flex">
                                    <div className="icon bg-white px-2 py-2 rounded-3 border d-flex align-items-center me-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill fw-semibold" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                        </svg>
                                    </div>
                                    <div className="text d-flex align-items-center">
                                        <p className="mb-0 fw-medium" style={{ width: "80px" }}>Phone:</p>
                                        <span className="">+92 (8800) 68 - 8960</span>
                                    </div>
                                </div>
                                <div className="icon-text d-flex my-3">
                                    <div className="icon bg-white px-2 py-2 rounded-3 border d-flex align-items-center me-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope fw-semibold" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                        </svg>
                                    </div>
                                    <div className="text d-flex align-items-center">
                                        <p className="mb-0 fw-medium" style={{ width: "80px" }}>Email:</p>
                                        <span className=""> Priya Dhakad@gmail.com</span>
                                    </div>
                                </div>
                                <div className="icon-text d-flex">
                                    <div className="icon bg-white px-2 py-2 rounded-3 border d-flex align-items-center me-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt fw-semibold" viewBox="0 0 16 16">
                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </div>
                                    <div className="text d-flex align-items-center">
                                        <p className="mb-0 fw-medium" style={{ width: "80px" }}>Address:</p>
                                        <span className=""> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="personal-information">
                                <h3 className="mb-3">PERSONAL INFORMATION</h3>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <table>
                                            <ul>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Name:</th>
                                                        <td>Priya Dhakad</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Fatheres name:</th>
                                                        <td>Raj Dhakad</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Family name: </th>
                                                        <td>Priya Dhakad</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Age:</th>
                                                        <td>24</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Date of birth:</th>
                                                        <td>03 Jan  1998</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Height:</th>
                                                        <td>167cm</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Weight:</th>
                                                        <td>65kg</td>
                                                    </tr>
                                                </li>
                                            </ul>
                                        </table>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <table>
                                            <ul>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Degree:</th>
                                                        <td>MSC Computer Science</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Religion:</th>
                                                        <td>Hindu</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Profession:</th>
                                                        <td>Working</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Company:</th>
                                                        <td>Google</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Position:</th>
                                                        <td>Web Developer</td>
                                                    </tr>
                                                </li>
                                                <li className="mb-3">
                                                    <tr>
                                                        <th style={{ width: "135px" }}>Salary:</th>
                                                        <td>   $1000 p/m</td>
                                                    </tr>
                                                </li>
                                            </ul>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="hobbies">
                                <h3 className="mb-3">HOBBIES</h3>
                                <div className="d-flex">
                                    <span className="px-2 bg-E9E9E9 text-dark fw-medium rounded-4" style={{ fontSize: "15px" }}>Modelling </span>
                                    <span className="px-2 bg-E9E9E9 text-dark fw-medium rounded-4 mx-3" style={{ fontSize: "15px" }}>Watching movies</span>
                                    <span className="px-2 bg-E9E9E9 text-dark fw-medium rounded-4" style={{ fontSize: "15px" }}>Playing volleyball</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}