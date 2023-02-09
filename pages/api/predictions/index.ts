import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.body);
	switch (req.method) {
		case "POST":
			return axios
				.post(
					"https://api.replicate.com/v1/predictions",
					{
						version:
							"30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
						input: {
							image: req.body.image,
							prompt: req.body.prompt,
						},
					},
					{
						headers: {
							Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
							"Content-Type": "application/json",
						},
					}
				)
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
