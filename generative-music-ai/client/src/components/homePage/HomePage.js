import React, { useState } from "react";
import { Button, BreadcrumbItem, BreadcrumbsBar } from "monday-ui-react-core";
import { useNavigate } from "react-router-dom";
import { Form, Quote, Emoji, Placeholder, Workspace } from "monday-ui-react-core/icons";
import { motion } from "framer-motion";
import { CSSTransition } from "react-transition-group";
import "./HomePage.css"; // make sure the path to your CSS file is correct
import HoverButton from "../hoverButton/HoverButton.js";
import WaveCard from "../waveCard/WaveCard.js";
import { useHover } from "@uidotdev/usehooks";
import { color } from "d3";

const HomePage = () => {
	const navigate = useNavigate();
	const [waveCardProps, setWaveCardProps] = useState({ text: "", colors: ["#fff"] }); // Default state

	const [hoverRef, isHovering] = useHover();
	const [hoverRef1, isHovering1] = useHover();
	const [hoverRef2, isHovering2] = useHover();
	const [hoverRef3, isHovering3] = useHover();
	const [hoverRef4, isHovering4] = useHover();
	const [hoverRef5, isHovering5] = useHover();

	const generateShade = (color, darkenPercentage = 20) => {
		if (!color.startsWith("#")) {
			console.error("Color must be in hexadecimal format");
			return color;
		}

		// Extract the red, green, and blue components from the color
		let r = parseInt(color.slice(1, 3), 16);
		let g = parseInt(color.slice(3, 5), 16);
		let b = parseInt(color.slice(5, 7), 16);

		// Darken each component by the darkenPercentage
		r = parseInt((r * (100 - darkenPercentage)) / 100);
		g = parseInt((g * (100 - darkenPercentage)) / 100);
		b = parseInt((b * (100 - darkenPercentage)) / 100);

		// Convert each component back to a two-digit hexadecimal number and return the combined color
		return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
	};

	React.useEffect(() => {
		let backgroundColor;
		let text;
		if (isHovering) {
			backgroundColor = "#FFB6C1"; // Light Pink
			text = "Record melody of your voice here!";
		} else if (isHovering1) {
			backgroundColor = "#4682B4"; // Steel Blue
			text = "Chat with the AI here!";
		} else if (isHovering2) {
			backgroundColor = "#868387  "; // Tan
			text = "Compose music here!";
		} else if (isHovering3) {
			backgroundColor = "#FF6B6B"; // Soft Red
			text = "Talk to the AI here!";
		} else if (isHovering4) {
			backgroundColor = "#FFA07A"; // Light Salmon
			text = "Express your feelings here!";
		} else if (isHovering5) {
			backgroundColor = "#8FBC8F"; // Dark Sea Green
			text = "Colour your mood here!";
		} else {
			backgroundColor = "#F0F8FF"; // Alice Blue (default color when not hovering)
		}

		if (backgroundColor !== "#F0F8FF") {
			setWaveCardProps({ text: text, colors: [backgroundColor, generateShade(backgroundColor)] });
		} else {
			setWaveCardProps({
				text: "Welcome to the Music Generative AI!\nDiscover six unique ways to create your own song.\nUnleash your creativity and start your musical journey now!",
				colors: ["#44b9c9", "#73ddd4"],
			});
		}
	}, [isHovering, isHovering1, isHovering2, isHovering3, isHovering4, isHovering5]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<CSSTransition
				in={true}
				appear={true}
				timeout={500}
				classNames="fade">
				<div>
					<BreadcrumbsBar
						style={{ position: "absolute", top: 0, left: 0 }}
						items={[
							{
								icon: Workspace,
								text: "Home",
							},
						]}>
						<BreadcrumbItem
							icon={Workspace}
							text="Home"
						/>
					</BreadcrumbsBar>
					<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "1%" }}>
						<div style={{ display: "flex", justifyContent: "space-between", width: "82%" }}>
							<HoverButton
								text="Melody"
								ref={hoverRef}
								onclick={() => navigate("/melody")}
								color="#FFB6C1"
								width="165px"
								height="200px"
							/>
							<HoverButton
								text="Chat"
								ref={hoverRef1}
								onclick={() => navigate("/chat")}
								color="#4682B4"
								width="165px"
								height="200px"></HoverButton>
							<HoverButton
								text="Compose"
								ref={hoverRef2}
								onclick={() => navigate("/composetext")}
								color="#868387"
								width="165px"
								height="200px"></HoverButton>
							<HoverButton
								text="Talk"
								ref={hoverRef3}
								onclick={() => navigate("/talk")}
								color="#FF6B6B"
								width="165px"
								height="200px"></HoverButton>
							<HoverButton
								text="Express"
								ref={hoverRef4}
								onclick={() => navigate("/express")}
								color="#FFA07A"
								width="165px"
								height="200px"></HoverButton>
							<HoverButton
								text="Colour"
								ref={hoverRef5}
								onclick={() => navigate("/color")}
								color="#8FBC8F"
								width="165px"
								height="200px"></HoverButton>
						</div>
						<WaveCard
							text={waveCardProps.text}
							infoStyle={{ color: "white", fontSize: "40px", marginLeft: "20px", marginRight: "20px", marginTop: "-10vh" }}
							cardStyle={{
								width: "92vw", // 80% of the viewport width
								height: "65vh", // 40% of the viewport height
								margin: "calc(-22vh) auto", // Adjust margin to be relative to viewport height
								transform: "perspective(40vw) rotateX(35deg)", // Adjust perspective to be relative to viewport width
							}}
							waveStyle={{ width: "1800px", height: "1900px", marginLeft: "-20%", marginTop: "-20%" }}
							colors={waveCardProps.colors}
						/>
					</div>
				</div>
			</CSSTransition>
		</motion.div>
	);
};

export default HomePage;
