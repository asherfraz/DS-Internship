import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import ReviewDetails from "./ReviewDetails";
import ViewUsers from "./ViewUsers";

const steps = [
	{
		icon: <IoPersonCircle className="size-7 text-gray-800" />,
		label: "Personal Info",
	},
	{
		icon: <FaAddressCard className="size-7 text-gray-800" />,
		label: "Address Details",
	},
	{
		icon: <FaEye className="size-7 text-gray-800" />,
		label: "Review Details ",
	},
];

const StepperForm = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [totalSteps, setTotalSteps] = useState(3);

	const renderStep = (step) => {
		switch (step) {
			case 1:
				return <PersonalDetails next={nextStep} />;
			case 2:
				return <AddressDetails back={prevStep} next={nextStep} />;
			case 3:
				return <ReviewDetails back={prevStep} next={nextStep} />;
			default:
				return;
		}
	};

	const nextStep = () => {
		if (currentStep <= totalSteps) {
			if (currentStep === totalSteps) {
				setCurrentStep(1);
			} else {
				setCurrentStep(currentStep + 1);
			}
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<main className=" h-screen container mx-auto m-4 flex flex-col justify-between items-center">
			{/* Top Section */}
			<div className="w-full flex flex-col justify-center">
				{/* Stepper Header */}
				<div className="flex flex-col justify-center items-center bg-amber-500 p-4 rounded-tl-lg rounded-tr-lg shadow-lg">
					<h2 className="text-2xl px-2 font-extrabold text-center border-b-3 border-white/70 text-gray-900">
						Stepper Form
					</h2>
					<div className="w-full h-full flex justify-evenly items-center gap-4 mt-2">
						{steps.map((step, index) => (
							<div key={index} className="flex flex-row items-center gap-2">
								<div
									className={`p-2 ${
										currentStep > index ? "bg-white/90" : "bg-gray-800/50"
									}  rounded-full shadow-lg`}
								>
									{step.icon}
								</div>
								<span
									className={`font-bold  ${
										currentStep > index ? "text-black/60" : "text-gray-800/50"
									}`}
								>
									{step.label}
								</span>
							</div>
						))}
					</div>
				</div>
				<hr className="text-black p-1" />
				{/* Form steps body */}
				<div className="flex flex-col justify-center items-center bg-amber-500/90 p-4 rounded-bl-lg rounded-br-lg shadow-lg">
					{renderStep(currentStep)}
				</div>
			</div>

			{/* Bottom Section */}
			<div className="w-full flex flex-col justify-center">
				<ViewUsers />
			</div>
		</main>
	);
};

export default StepperForm;
