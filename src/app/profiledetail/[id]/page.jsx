"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header/Page";

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
    <h4 className="text-white p-4 text-center font-bold mb-0">
      Lakhs of Happy Marriages
    </h4>
  </div>

  <div className="container-fluid content bg-FDFBF7">
    <div className="container">
      <div className="row py-5">

        {/* LEFT SIDE — IMAGE */}
        <div className="col-md-4 px-3">
          <div className="card rounded-3">
            <img src={image|| "/dhakadweb/assets/images/priya.png"} className="card-img-top" alt={profile.name} />

            <div className="btn-bottom">
              <Link href="/" className="btn bg-danger text-white fw-medium rounded-top-0 rounded-end-0 p-3" style={{ fontSize: "15px" }}>
                Chat Now
              </Link>
              <Link href="/" className="btn text-white fw-medium rounded-0 bg-D4AF37 p-3" style={{ fontSize: "15px" }}>
                Send Interest
              </Link>
              <button className="btn text-black fw-medium rounded-top-0 rounded-start-0 p-3 bg-E3E3E3" style={{ fontSize: "15px" }}>
                Add Shortlist
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-8 px-4">
          {/* NAME */}
          <h2 className="fw-semibold">{profile.name || "No Name Available"}</h2>

          <hr />

          {/* ABOUT */}
          <div className="about">
            <h3>ABOUT</h3>
            <p className="fw-medium">{profile.aboutYourself || "No bio available"}</p>
          </div>

          <hr />

          {/* GALLERY */}
          <div className="gallery">
            <h3 className="mb-3">PHOTO GALLERY</h3>
            <div className="row justify-content-between">
              {gallery && gallery.length > 0 ? (
                gallery.map((pic, i) => (
                  <div className="col-md-3 mb-3" key={i}>
                    <img src={pic} alt={`gallery-${i}`} className="w-100 rounded" />
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
            <h3 className="mb-3">CONTACT INFO</h3>
            <div className="icon-text d-flex mb-3">
              <div className="icon bg-white px-2 py-2 rounded-3 border d-flex align-items-center me-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill fw-semibold" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
              </div>
              <div className="text d-flex align-items-center">
                <p className="mb-0 fw-medium" style={{ width: "80px" }}>Phone:</p>
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
                <p className="mb-0 fw-medium" style={{ width: "80px" }}>Email:</p>
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
                <p className="mb-0 fw-medium" style={{ width: "80px" }}>Address:</p>
                <span>{profile.location || "Not Provided"}</span>
              </div>
            </div>
          </div>

          <hr />

          {/* PERSONAL INFORMATION */}
          <div className="personal-information">
            <h3 className="mb-3">PERSONAL INFORMATION</h3>
            <div className="row">
              <div className="col-md-6 col-12">
                <ul className="list-unstyled">
                  <li><strong>Name:</strong> {profile.name || "N/A"}</li>
                  <li><strong>Age:</strong> {age || "N/A"}</li>
                  <li><strong>DOB:</strong> {profile.dob?.slice(0, 10) || "N/A"}</li>
                  <li><strong>Height:</strong> {profile.height || "N/A"}</li>
                  <li><strong>Religion:</strong> {profile.religion || "N/A"}</li>
                  <li><strong>Gotra:</strong> {profile.gotra || "N/A"}</li>
                </ul>
              </div>

              <div className="col-md-6 col-12">
                <ul className="list-unstyled">
                  <li><strong>Education:</strong> {profile.education || "N/A"}</li>
                  <li><strong>Occupation:</strong> {profile.occupation || "N/A"}</li>
                  <li><strong>Income:</strong> {profile.annualIncome || "N/A"}</li>
                  <li><strong>Family Status:</strong> {profile.familyStatus || "N/A"}</li>
                  <li><strong>Employment Type:</strong> {profile.employmentType || "N/A"}</li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

          {/* HOBBIES */}
          <div className="hobbies">
            <h3 className="mb-3">HOBBIES</h3>
            {profile.hobbies && profile.hobbies.length > 0 ? (
              <div className="d-flex flex-wrap">
                {profile.hobbies.map((hobby, i) => (
                  <span key={i} className="px-2 bg-E9E9E9 text-dark fw-medium rounded-4 me-2 mb-2" style={{ fontSize: "15px" }}>
                    {hobby}
                  </span>
                ))}
              </div>
            ) : (
              <span className="px-2 bg-E9E9E9 rounded-4">No hobbies added</span>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
</main>



    );
}
