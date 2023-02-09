export type Post = {
	id: string;
	image: string;
	caption: string;
	profiles: {
		username: string;
	};
};

export type Bomb = {
	id: string;
	image: string;
	instructions: string;
	profiles: {
		username: string;
	};
};

export type Prediction = {
	output: string[] | null;
};
