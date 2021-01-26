import React, { useState } from "react";

import ProfileForm from "../layout/ProfileForm";
import ParkingForm from "../layout/ParkingForm";

import SuccessNotice from "../misc/SuccessNotice";
import ErrorNotice from "../misc/ErrorNotice";

export default function Profile() {
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    return (
        <>
            <div className="page">
                {error && (
                    <ErrorNotice
                        message={error}
                        clearError={() => setError(undefined)}
                    />
                )}
                {success && (
                    <SuccessNotice
                        message={success}
                        clearSuccess={() => setSuccess(undefined)}
                    />
                )}
                <h2>Profiliniz</h2>
                <div className="profile-page">
                    <ProfileForm
                        errorMessage={setError}
                        successMessage={setSuccess}
                    />
                    <span className="margin-10"></span>
                    <ParkingForm
                        errorMessage={setError}
                        successMessage={setSuccess}
                    />
                </div>
            </div>
        </>
    );
}
