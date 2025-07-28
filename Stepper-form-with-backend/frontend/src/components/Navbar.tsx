import { Github } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
	return (
		<header className="flex justify-center items-center bg-primary text-white p-4">
			<div className="container mx-auto flex justify-between items-center gap-8 ">
				<Link to="/" className="text-white text-2xl font-bold">
					<h2 className="text-2xl font-bold">Notes App</h2>
				</Link>
				{/* <span className="hidden md:block text-gray-600 text-2xl">|</span> */}
				{/* <nav>
					<ul className="flex justify-evenly items-center gap-2 space-x-4">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									`${
										isActive ? "text-white" : "text-gray-300 hover:text-white"
									}`
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/add-note"
								className={({ isActive }) =>
									isActive ? "text-white" : "text-gray-300 hover:text-white"
								}
							>
								Add Note
							</NavLink>
						</li>
					</ul>
				</nav> */}
				<Link
					to="https://github.com/asherfraz/"
					target="_blank"
					className="text-white text-2xl font-bold flex justify-center items-center gap-2 border-2 rounded-lg p-2 hover:bg-white hover:text-primary transition-colors"
				>
					<h2 className="text-sm font-bold">Checkout my Github</h2>
					<Github className="size-5 hover:text-gray-800" />
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
