import React from 'react';

function SwipeCard() {
    return (
        <a href="">
            <div class="flex w-full">
                <div class="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:hover:-translate-x-16 md:hover:-translate-y-8">
                    <img class="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36" src="https://d33wubrfki0l68.cloudfront.net/20dc8d739513a0ef9407e3a0d8396ee2707cebd9/1cf00/images/ogtwitter.png" alt="blog" />
                    <div class="px-6 py-8">
                        <h4 class="mt-4 text-2xl font-semibold text-neutral-600">
                            <span class="">Entry
                            </span></h4>
                        <p class="mt-4 text-base font-normal text-gray-500 leading-relax"> Install Tailwind CSS without any Javascript Framewrok locally with purgeCSS, enable the dark mode option, prefferences or class is upt to you. </p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default SwipeCard;
