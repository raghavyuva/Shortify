export const CTA = () => {
  return (
    <aside class="relative overflow-hidden from-pink-900 h-full via-blue-200 to-green-500 ">
      <div class="relative z-10 max-w-screen-xl px-4 py-24 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-xl space-y-8 text-center sm:text-right sm:ml-auto">
          <h2 class="text-4xl font-bold sm:text-5xl">
            Help Service
            <span class="hidden sm:block">
              24*7 HelpLine Center
            </span>
          </h2>

          <p class="hidden sm:block sm:max-w-lg sm:ml-auto sm:text-lg">
            Does your blog / articles are having issues? feel free to contact us to get it solved right away
          </p>

          <a  class="inline-flex items-center px-6 py-3 font-medium bg-blue-500 rounded-full hover:opacity-75"  href="/contact">
            Contact Now

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <div class="absolute inset-0 w-full h-full mix-blend-multiply">
        <img
          src="https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80"
          alt="New robot toy"
          class="absolute inset-0 object-cover object-top w-full h-full"
        />
      </div>
    </aside>

  )
}