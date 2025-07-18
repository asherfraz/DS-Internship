import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			<main className="container mx-auto">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
