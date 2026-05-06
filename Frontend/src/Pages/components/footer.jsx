function Footer() {
    return (
        <>

            <footer className="bg-[#161C26] text-white py-10 pl-5 pr-5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Left Section */}
                    <div>
                        <h3 className="text-xl font-bold bg-zinc-800 border-white text-center px-4 rounded-xl py-4 inline-block">
                            <span className="text-blue-500 text-3xl font-extrabold">One</span>
                            <span className="text-green-500 text-3xl font-extrabold">FinServe</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-loose mt-4">
                            Empowering your financial journey with smart SIPs and expertly curated Mutual Funds. We make wealth creation simple, transparent, and secure for everyone.
                        </p>

                        {/* Social Icons */}
                        <div className="flex justify-start mt-4 space-x-4 flex-wrap">
                            {/* Facebook */}
                            <a href="#" className="text-white hover:text-blue-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12a10 10 0 10-11.5 9.95v-7.04H8v-2.91h2.5V9.33c0-2.46 1.46-3.82 3.7-3.82 1.07 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.53v1.86H18l-.4 2.91h-2.34v7.04A10 10 0 0022 12z" />
                                </svg>
                            </a>
                            {/* Twitter */}
                            <a href="#" className="text-white hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.55 8.55 0 01-2.7 1.03 4.28 4.28 0 00-7.3 3.9A12.15 12.15 0 013 4.8a4.28 4.28 0 001.33 5.7 4.23 4.23 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.19 4.28 4.28 0 01-1.93.07 4.28 4.28 0 003.99 2.97 8.58 8.58 0 01-5.3 1.82A8.85 8.85 0 012 19.54 12.1 12.1 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.36 8.36 0 0022.46 6z" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className="text-white hover:text-blue-700">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.37h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.58z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 inline-block border-b-2 border-green-500 pb-2">
                            Legal
                        </h3>
                        <ul className="text-gray-400 text-sm space-y-3">
                            <li>
                                <a href="#" className="group flex items-center hover:text-white transition-all duration-300">
                                    <span className="mr-2 text-blue-600 group-hover:text-green-500 transition-colors duration-300">&gt;</span>
                                    <span className="group-hover:translate-x-2 transform transition-transform duration-300">Disclamer</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group flex items-center hover:text-white transition-all duration-300">
                                    <span className="mr-2 text-blue-600 group-hover:text-green-500 transition-colors duration-300">&gt;</span>
                                    <span className="group-hover:translate-x-2 transform transition-transform duration-300">Privacy Policy</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group flex items-center hover:text-white transition-all duration-300">
                                    <span className="mr-2 text-blue-600 group-hover:text-green-500 transition-colors duration-300">&gt;</span>
                                    <span className="group-hover:translate-x-2 transform transition-transform duration-300">Terms of Use</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group flex items-center hover:text-white transition-all duration-300">
                                    <span className="mr-2 text-blue-600 group-hover:text-green-500 transition-colors duration-300">&gt;</span>
                                    <span className="group-hover:translate-x-2 transform transition-transform duration-300">Grievance</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 inline-block border-b-2 border-green-500 pb-2">
                            Contact Us
                        </h3>
                        <ul className="text-sm space-y-4">
                            <li className="flex items-center gap-3">
                                <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </span>
                                <a href="mailto:info@example.com" className="text-gray-400 hover:text-white text-md">support@onefinserv.in</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <a href="tel:+1234567890" className="text-gray-400 hover:text-white text-md">1800-123-4567</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-gray-400 hover:text-white text-md">I Don't Know, Ludhiana, Punjab</span>
                            </li>
                        </ul>
                    </div>

                    {/* Risk Warning Section */}
                    <div>
                        <div className="flex items-start mb-2">
                            <svg className="w-6 h-6 text-yellow-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l6.518 11.584c.75 1.334-.213 3.017-1.723 3.017H3.462c-1.51 0-2.473-1.683-1.723-3.017L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-400 text-sm">
                                <strong>Risk Warning:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the market factors. Past performance is not indicative of future returns.
                            </p>
                        </div>
                    </div>

                </div>
            </footer>
            <div className="pt-8 pb-8 bg-[#1E2530] text-gray-500 text-sm text-center">
                &copy; {new Date().getFullYear()} OneFinServ. All Rights Reserved. Designed for financial growth
            </div>
        
        </>
    )
}

export default Footer