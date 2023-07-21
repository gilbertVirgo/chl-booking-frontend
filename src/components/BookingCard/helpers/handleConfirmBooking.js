import emailTemplates from "../../../email-templates";
import get from "../../../api/get";
import patch from "../../../api/patch";

export default async (booking, onSuccess, onError) => {
	await patch(`/booking/${booking.index}`, {
		status: "confirmed",
	}).catch(onError);

	// Add to calendar

	// Mailto
	const { data: customer } = await get(`/booking/${booking.index}/customer`);

	window.location.href = `mailto:${
		customer.email
	}?body=${emailTemplates.confirm(
		booking,
		customer
	)}&subject=Christian%20Heritage%20London%20walk%20with%20${
		customer.firstname
	}`;

	onSuccess();
};