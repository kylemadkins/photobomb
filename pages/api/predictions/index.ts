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
							"f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
						input: {
							prompt: req.body.prompt,
							width: 512,
							height: 512,
							num_inference_steps: 100,
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
