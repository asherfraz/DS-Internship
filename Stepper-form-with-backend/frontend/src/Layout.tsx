import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen ">
			<Navbar />
			<main className="flex-grow container mx-auto px-4 py-6">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
