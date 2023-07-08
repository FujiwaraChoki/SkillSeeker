import Link from "next/link";

const Footer = () => {
    return (
        <footer className="text-gray-800 py-4">
            <div className="container mx-auto flex items-center justify-center h-full">
                <p className="text-sm mr-4 font-bold">
                    👨‍💻 with ❤️ by{" "}
                    <Link className="hover:text-blue-500" target="_blank" href="https://github.com/FujiwaraChoki">
                        Sami Hindi
                    </Link>
                </p>
            </div>
            <div className="container mx-auto flex items-center justify-center h-full">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}{" "}
                    <Link className="hover:text-blue-500" target="_blank" href="https://github.com/FujiwaraChoki">
                        Sami Hindi
                    </Link>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
