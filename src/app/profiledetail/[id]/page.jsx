"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header/Page";
import Readytomeet from "@/app/components/Readytomeet/page";
import Footer from "@/app/components/Footer/page";

export default function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await fetch(`http://206.189.130.102:5000/api/profile/${id}`);
      const data = await res.json();
      setProfile(data.profile);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Profile...</h4>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-5">
        <h4>Profile Not Found</h4>
      </div>
    );
  }

  // Helper fallback values
  const image = profile.photos?.length ? profile.photos[0] : "/dhakadweb/assets/images/default-profile.png";
  const gallery = profile.photos?.length ? profile.photos : [];
  const age = profile.dob ? new Date().getFullYear() - new Date(profile.dob).getFullYear() : "N/A";

  return (
    <main>
      <Header />

      <div className="sub-bg">
        <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner">
          Lakhs of Happy Marriages
        </h4>
      </div>

      <div className="container-fluid content bg-FDFBF7">
        <div className="container">
          <div className="row py-5">

            {/* LEFT SIDE — IMAGE */}
            <div className="col-md-4 px-3">
              <div className="row card rounded-3">
                <div className="col-12 p-0">
                  <img src={image || "/dhakadweb/assets/images/priya.png"} className="card-img-top" alt={profile.name} />
                </div>
                <div className="col-12">
                  <div className="row btn-bottom">
                    <Link href="/" className="col-4 btn bg-danger text-white fw-medium rounded-top-0 rounded-end-0 py-3" style={{ fontSize: "15px" }}>
                      Chat Now
                    </Link>
                    <Link href="/" className="col-4 btn text-white fw-medium rounded-0 bg-D4AF37 py-3" style={{ fontSize: "15px" }}>
                      Send Interest
                    </Link>
                    <button className="col-4 btn text-black fw-medium rounded-top-0 rounded-start-0 bg-E3E3E3 py-3" style={{ fontSize: "15px" }}>
                      Add Shortlist
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-8 px-lg-4">
              {/* NAME */}
              <h5 className="fw-semibold text-capitalize mb-3">{profile.name || "No Name Available"}</h5>
              <div className="d-flex gap-3 align-items-center flex-wrap mb-3">
                <div className="border text-center bg-white rounded-3 p-2 d-flex justify-content-center align-items-center"
                  style={{ width: "110px", height: "110px" }}>
                  <div className="">
                    <div className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 26 32" fill="none">
                        <path d="M13.5 19C17.0848 19 20 16.0848 20 12.5C20 8.91525 17.0848 6 13.5 6C9.91525 6 7 8.91525 7 12.5C7 16.0848 9.91525 19 13.5 19ZM13.5 9.25C15.2924 9.25 16.75 10.7076 16.75 12.5C16.75 14.2924 15.2924 15.75 13.5 15.75C11.7076 15.75 10.25 14.2924 10.25 12.5C10.25 10.7076 11.7076 9.25 13.5 9.25Z" fill="#D4AF37" />
                        <path d="M12.0575 31.7034C12.3327 31.8963 12.6622 32 13 32C13.3378 32 13.6673 31.8963 13.9425 31.7034C14.4365 31.3594 26.047 23.1047 25.9999 12.8004C25.9999 5.74258 20.1678 0 13 0C5.8322 0 0.00014306 5.74258 0.00014306 12.7924C-0.0469814 23.1047 11.5635 31.3594 12.0575 31.7034ZM13 3.2001C18.3771 3.2001 22.7499 7.50583 22.7499 12.8084C22.784 19.9094 15.6195 26.2856 13 28.3769C10.3822 26.284 3.21598 19.9062 3.25011 12.8004C3.25011 7.50583 7.62293 3.2001 13 3.2001Z" fill="#D4AF37" />
                      </svg>
                    </div>
                    <p className="mb-0">CITY</p>
                    <h6 className="mb-0 fw-bold">INDORE</h6>
                  </div>
                </div>
                <div className="border text-center bg-white rounded-3 p-2 d-flex justify-content-center align-items-center"
                  style={{ width: "110px", height: "110px" }}>
                  <div className="">
                    <div className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <path d="M15.8333 0C24.5781 0 31.6667 7.08858 31.6667 15.8333C31.6714 19.9559 30.0632 23.9168 27.1858 26.8692C25.712 28.3893 23.9474 29.5974 21.9971 30.4216C20.0468 31.2458 17.9506 31.6692 15.8333 31.6667C13.716 31.6692 11.6199 31.2458 9.66955 30.4216C7.71925 29.5974 5.95467 28.3893 4.48084 26.8692C1.60349 23.9168 -0.00472486 19.9559 1.04275e-05 15.8333C1.04275e-05 7.08858 7.08859 0 15.8333 0ZM15.8333 22.1667C14.3294 22.1655 12.841 22.4713 11.4593 23.0653C10.0776 23.6594 8.83175 24.5292 7.79793 25.6215C10.0601 27.4864 12.9016 28.5043 15.8333 28.5C18.7645 28.5039 21.6054 27.486 23.8672 25.6215C22.8335 24.5294 21.5879 23.6597 20.2065 23.0656C18.8251 22.4716 17.337 22.1657 15.8333 22.1667ZM15.8333 3.16667C13.4927 3.16664 11.1978 3.81517 9.2034 5.04027C7.20897 6.26538 5.59301 8.01914 4.53484 10.1069C3.47667 12.1947 3.01769 14.5349 3.20884 16.8677C3.39998 19.2006 4.23377 21.4348 5.61768 23.3225C6.94337 21.9535 8.53102 20.8653 10.2861 20.1227C12.0411 19.3801 13.9277 18.9983 15.8333 19C17.7388 18.9985 19.625 19.3804 21.3798 20.123C23.1345 20.8656 24.7219 21.9537 26.0474 23.3225C27.4313 21.4349 28.265 19.2008 28.4562 16.8681C28.6474 14.5354 28.1886 12.1954 27.1306 10.1076C26.0726 8.0199 24.4569 6.26611 22.4627 5.04089C20.4685 3.81567 18.1739 3.16693 15.8333 3.16667ZM15.0892 5.25667C15.1485 5.10781 15.2512 4.98018 15.3838 4.89026C15.5165 4.80035 15.6731 4.75229 15.8333 4.75229C15.9936 4.75229 16.1502 4.80035 16.2828 4.89026C16.4155 4.98018 16.5181 5.10781 16.5775 5.25667L16.9797 6.2225C17.6518 7.86137 18.9268 9.18006 20.5422 9.90692L21.679 10.4104C22.3282 10.7002 22.3282 11.647 21.679 11.9368L20.4757 12.4719C18.9008 13.1786 17.6479 14.4496 16.9638 16.0344L16.5728 16.9306C16.5119 17.0765 16.4092 17.2012 16.2776 17.2889C16.146 17.3765 15.9915 17.4233 15.8333 17.4233C15.6752 17.4233 15.5206 17.3765 15.3891 17.2889C15.2575 17.2012 15.1548 17.0765 15.0939 16.9306L14.7044 16.036C14.0199 14.4501 12.7657 13.1783 11.1894 12.4719L9.98609 11.9368C9.84039 11.8694 9.717 11.7617 9.63053 11.6265C9.54405 11.4913 9.4981 11.3341 9.4981 11.1736C9.4981 11.0131 9.54405 10.8559 9.63053 10.7207C9.717 10.5854 9.84039 10.4778 9.98609 10.4104L11.1229 9.90692C12.7386 9.18077 14.0142 7.86265 14.687 6.22408L15.0892 5.25667Z" fill="#D4AF37" />
                      </svg>
                    </div>
                    <p className="mb-0">AGE</p>
                    <h6 className="mb-0 fw-bold">21</h6>
                  </div>
                </div>
                <div className="border text-center bg-white rounded-3 p-2 d-flex justify-content-center align-items-center"
                  style={{ width: "110px", height: "110px" }}>
                  <div className="">
                    <div className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="29" viewBox="0 0 13 32" fill="none">
                        <path d="M6.33333 28.5L0 22.1667L2.21667 19.95L4.75 22.4437V6.05625L2.21667 8.55L0 6.33333L6.33333 0L12.6667 6.33333L10.45 8.58958L7.91667 6.05625V22.4437L10.45 19.95L12.6667 22.1667L6.33333 28.5Z" fill="#D4AF37" />
                      </svg>
                    </div>
                    <p className="mb-0">HEIGHT</p>
                    <h6 className="mb-0 fw-bold">5.7</h6>
                  </div>
                </div>
                <div className="border text-center bg-white rounded-3 p-2 d-flex justify-content-center align-items-center"
                  style={{ width: "110px", height: "110px" }}>
                  <div className="">
                    <div className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 34 32" fill="none">
                        <path d="M3.33333 31.6667C2.41667 31.6667 1.63222 31.3406 0.98 30.6883C0.327778 30.0361 0.00111111 29.2511 0 28.3333V10C0 9.08333 0.326667 8.29889 0.98 7.64667C1.63333 6.99444 2.41778 6.66778 3.33333 6.66667H10V3.33333C10 2.41667 10.3267 1.63222 10.98 0.98C11.6333 0.327778 12.4178 0.00111111 13.3333 0H20C20.9167 0 21.7017 0.326667 22.355 0.98C23.0083 1.63333 23.3344 2.41778 23.3333 3.33333V6.66667H30C30.9167 6.66667 31.7017 6.99333 32.355 7.64667C33.0083 8.3 33.3344 9.08444 33.3333 10V28.3333C33.3333 29.25 33.0072 30.035 32.355 30.6883C31.7028 31.3417 30.9178 31.6678 30 31.6667H3.33333ZM3.33333 28.3333H30V10H3.33333V28.3333ZM13.3333 6.66667H20V3.33333H13.3333V6.66667Z" fill="#D4AF37" />
                      </svg>
                    </div>
                    <p className="mb-0">JOB</p>
                    <h6 className="mb-0 fw-bold">WORKING</h6>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* ABOUT */}
              <div className="about">
                <h5 className="fw-semibold">ABOUT</h5>
                <p className="fw-medium">{profile.aboutYourself || "No bio available"}</p>
              </div>

              <hr className="my-4" />

              {/* GALLERY */}
              <div className="gallery">
                <h5 className="fw-semibold mb-3">PHOTO GALLERY</h5>
                <div className="row justify-content-between">
                  {gallery && gallery.length > 0 ? (
                    gallery.map((pic, i) => (
                      <div className="col-6 col-md-3 mb-3" key={i}>
                        <img src={pic} alt={`gallery-${i}`} className="w-100 rounded-4" />
                      </div>
                    ))
                  ) : (
                    <p>No photos available</p>
                  )}
                </div>
              </div>

              <hr />

              {/* CONTACT INFO */}
              <div className="contact">
                <h5 className="fw-semibold mb-3">CONTACT INFO</h5>
                <div className="icon-text d-flex mb-3">
                  <div className="icon bg-white px-2 py-2 rounded-3 border d-flex align-items-center me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill fw-semibold" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                  </div>
                  <div className="text d-flex align-items-center">
                    <p className="mb-0 fw-medium" style={{ width: "65px" }}>Phone:</p>
                    <span>{profile.phone || "Not Available"}</span>
                  </div>
                </div>

                <div className="icon-text d-flex mb-3">
                  <div className="icon bg-white px-2 py-2 rounded-3 border d-flex align-items-center me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope fw-semibold" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>
                  </div>
                  <div className="text d-flex align-items-center">
                    <p className="mb-0 fw-medium" style={{ width: "65px" }}>Email:</p>
                    <span>{profile.email || "Not Available"}</span>
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
                    <p className="mb-0 fw-medium" style={{ width: "65px" }}>Address:</p>
                    <span>{profile.location || "Not Provided"}</span>
                  </div>
                </div>
              </div>

              <hr />

              {/* PERSONAL INFORMATION */}
              <div className="personal-information">
                <h5 className="fw-semibold mb-3">PERSONAL INFORMATION</h5>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="table-responsive">
                      <table className="table bg-transparent">
                        <tbody>
                          <tr>
                            <td className="bg-transparent border-0">Name:</td>
                            <td className="bg-transparent border-0">{profile.name || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Age:</td>
                            <td className="bg-transparent border-0">{age || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">DOB:</td>
                            <td className="bg-transparent border-0">{profile.dob?.slice(0, 10) || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Height:</td>
                            <td className="bg-transparent border-0">{profile.height || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Religion:</td>
                            <td className="bg-transparent border-0">{profile.religion || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Gotra:</td>
                            <td className="bg-transparent border-0">{profile.gotra || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="table-responsive">
                      <table className="table bg-transparent">
                        <tbody>
                          <tr>
                            <td className="bg-transparent border-0">Education:</td>
                            <td className="bg-transparent border-0">{profile.education || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Occupation:</td>
                            <td className="bg-transparent border-0">{profile.occupation || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Income:</td>
                            <td className="bg-transparent border-0">{profile.annualIncome || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Family Status:</td>
                            <td className="bg-transparent border-0">{profile.familyStatus || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="bg-transparent border-0">Employment Type:</td>
                            <td className="bg-transparent border-0">{profile.employmentType || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* HOBBIES */}
              <div className="hobbies">
                <h5 className="fw-semibold mb-3">HOBBIES</h5>
                {profile.hobbies && profile.hobbies.length > 0 ? (
                  <div className="d-flex flex-wrap">
                    {profile.hobbies.map((hobby, i) => (
                      <span key={i} className="px-3 py-1 bg-E9E9E9 text-dark fw-medium rounded-4 me-2 mb-2" style={{ fontSize: "15px" }}>
                        {hobby}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="px-3 py-1 bg-E9E9E9 rounded-4">No hobbies added</span>
                )}
              </div>

            </div>
            {/* ReadyToMeet */}
            <div className="">
              <Readytomeet />
            </div>
          </div>
        </div>
      </div >

      {/* Footer */}
      <Footer />

    </main >
  );
}
