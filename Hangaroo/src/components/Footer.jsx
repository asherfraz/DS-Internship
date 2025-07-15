import React from "react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="bg-green-800 text-white py-4">
			<div className="container mx-auto text-center">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} HangMan. All rights reserved.
				</p>
				<p className="text-xs mt-2">
					Made by{" "}
					<a href="https://asherfraz.com/" target="_blank">
						asherfraz
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
