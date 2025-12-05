// myprofile/components/Layout/DashboardLayout.jsx
"use client";

import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar we already created
// Assuming you will create these components soon:
import Header from '../../../components/Header/Page';
import Footer from '../../../components/Footer/page';

export default function DashboardLayout({ children }) {
  return (
    <div className="app-container">

      <Header />

      {/* 2. Main Content Wrapper */}
      <main className="dashboard-wrapper bg-FDFBF7">
        <div className="container-fluid dashboard-inner-content">
          <div className="container">
            <div className="row">

              {/* 2a. Left Column: Sidebar */}
              {/* This column holds the fixed navigation menu */}
              <div className="col-md-3 mb-0 py-3">
                <Sidebar />
              </div>

              {/* 2b. Right Column: Page Content */}
              {/* This column renders the specific page content (Dashboard, Profile, Interests, etc.) */}
              <div className="col-md-9 py-3">
                <div className="page-content-container">
                  {children} {/* Renders the content of the current route/page */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}