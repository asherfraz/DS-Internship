import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="w-full bg-primary text-white py-4 text-center">
			<p className="text-sm">
				&copy; {new Date().getFullYear()} Notes App — Built by{" "}
				<Link
					to="https://asherfraz.com/"
					className="text-white underline font-semibold hover:text-gray-200"
					target="_blank"
					rel="noopener noreferrer"
				>
					@asherfraz
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
