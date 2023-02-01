import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "GET":
			return axios
				.get("https://api.replicate.com/v1/predictions/" + req.query.id, {
					headers: {
						Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
						"Content-Type": "application/json",
					},
				})
				.then(({ data }) => {
					res.status(201).json(data);
					return;
				})
				.catch((err) => {
					res.status(500).json({ detail: err });
					return;
				});
		default:
			res.status(405).end();
			return;
	}
}
