import patch from "../../../api/patch";

export default async (booking, onSuccess, onError) =>
	patch(`/booking/${booking.index}`, { archived: true })
		.then(() => onSuccess())
		.catch(onError);
