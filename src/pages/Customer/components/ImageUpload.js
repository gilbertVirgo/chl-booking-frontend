import { default as BSCard } from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import GlobalContext from "../../../GlobalContext";
import React from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import imageCompression from "browser-image-compression";
import patch from "../../../api/patch";
import styled from "styled-components";

const Card = styled(BSCard)`
	height: fit-content;
`;

const Overlay = styled.section`
	text-align: center;
	pointer-events: none;
`;

const Input = styled(Form.Control)`
	opacity: 0;

	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

export default ({ customerIndex, multiple, onChange }) => {
	const { setError, setLoading } = React.useContext(GlobalContext);

	const handleChange = async ({ target: { files } }) => {
		const formData = new FormData();

		for (const file of files) {
			const compressedFile = await imageCompression(file, {
				maxSizeMB: 0.15,
				maxWidthOrHeight: 800,
			});

			formData.append("images", compressedFile, file.name);
		}

		setLoading(true);
		patch(`/customer/${customerIndex}/images`, formData, {
			fileUpload: true,
		})
			.then(onChange)
			.catch(({ message }) => setError(message))
			.finally(() => setLoading(false));
	};

	return (
		<Card body>
			<Overlay>
				<p
					style={{
						fontSize: "50px",
						lineHeight: "70px",
					}}
				>
					<FontAwesomeIcon icon={faUpload} />
				</p>
				<small className="text-muted">Upload new images</small>
			</Overlay>
			<Input
				onChange={handleChange}
				type="file"
				name="images"
				accept="image/*"
				multiple={multiple ? "multiple" : undefined}
			/>
		</Card>
	);
};

// ref.current.submit

// Trying to figure out why req.file, req.files is empty on the backend
