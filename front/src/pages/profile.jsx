import React, { useState } from 'react';
import ProfCard from '../components/profileCard/profCard';
import { Nav } from '../components/topBar/topBar'
function Profile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
            <section className="bg-coolGray-100 text-coolGray-800 ">
                <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 shadow-lg">
                    <Nav
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <ProfCard
                        user={JSON.parse(localStorage.getItem("user"))}
                    />
                </div>
            </section>
        </div>
    )
}

export default Profile;
