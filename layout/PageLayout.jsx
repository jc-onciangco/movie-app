import React from 'react'

function PageLayout({children}) {
  return (
      <>
        <div className="h-[8vh]"></div>
        <main className="w-full px-2 md:px-4 py-6 md:py-10">
            <div className="max-w-[1380px] mx-auto h-full flex px-2 sm:px-4 md:px-0">
                {children}
            </div>
        </main>
      </>
  )
}

export default PageLayout