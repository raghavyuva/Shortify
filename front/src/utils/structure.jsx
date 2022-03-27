import React, { useState } from 'react';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { Nav } from '../components/topBar/topBar';
import { CTA} from '../components/CTA'
import { ShowBanner } from '../components/ShowBanner';
function Structure({
    Component,
    Data
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <section className="bg-coolGray-100 text-coolGray-800">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 shadow-lg">
                <Nav
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
                {/* <ShowBanner /> */}
                <div className='fixed bg-black z-50 sm:hidden'>
                    {
                        isMenuOpen &&
                        <SideBar />
                    } 
                </div>
                {Component?.hero &&
                    Data?.Article?.sort((a,b)=>{new Date(a.created_at)-new Date(b.created_at)}).slice(0,1).map((d) => {
                        return (
                            <Component.hero data={d} />
                        )
                    })
                }
                <div id='hey' className="grid justify-center grid-cols-1  sm:grid-cols-2 lg:grid-cols-3  shadow-2xl p-2  gap-6">
                    {
                        Component?.blogs &&
                        Data?.Article?.slice(1, Data?.Article?.length).map((d) => {
                            return (
                              <div className=' shadow-lg shadow-cyan-500'>
                                    <Component.blogs data={d} />
                              </div>
                            )
                        })
                    }
                </div>
                {/* <section class="md:overflow-x-scroll">
                    <div class="container p-5 py-12 mx-auto md:p-20 max-w-7xl">
                        <div class="flex flex-wrap mx-auto md:flex-nowrap">
                            {
                                Component?.swipe &&
                                <Component.swipe />
                            }
                        </div>
                    </div>
                </section> */}
                <CTA />
                <Footer />
            </div>
        </section>
    )
}

export default Structure;
