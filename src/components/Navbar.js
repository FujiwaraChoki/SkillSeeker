import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <img src="/logo.png" alt="GitHub Mark" className="block h-8 w-auto" />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link target="_blank" href="https://github.com/FujiwaraChoki/SkillSeeker" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                About
                            </Link>
                            <Link target="_blank" href="https://github.com/FujiwaraChoki?tab=repositories" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Projects
                            </Link>
                            <Link target="_blank" href="https://www.samihindi.com/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
