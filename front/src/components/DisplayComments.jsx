import React from 'react'

function DisplayComments({ele}) {
    return (
        <div className='flex align-left bg-green-500 shadow-lg'>
            <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-coolGray-700 dark:bg-coolGray-900 dark:text-coolGray-100">
                <div className="flex justify-between  items-center">
                    <div className="flex ">
                        <div>
                            <img src="http://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png" alt="" className="object-cover w-12 h-12  dark:bg-coolGray-500" />
                        </div>
                        <div>
                            <h4 className="font-bold">{ele.publishedBy}</h4>
                        </div>
                    </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:text-coolGray-400">
                    {ele.comment}
                </div>
            </div>
        </div >
    )
}

export default DisplayComments