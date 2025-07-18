import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="relative bottom-0 w-full flex items-center justify-center bg-primary text-white py-4">
			<p>
				&copy; {new Date().getFullYear()} - Notes App - Built by{" "}
				<Link to="https://asherfraz.com/" className="text-white font-semibold">
					@asherfraz
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
