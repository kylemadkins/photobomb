import { FormEventHandler, useState } from "react";
import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

import DefaultLayout from "@/components/DefaultLayout";
import Card from "@/components/Card";
import Form from "@/components/Form";
import ImageUpload from "@/components/ImageUpload";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import CloseIcon from "@/components/icon/Close";

export default function New() {
	const supabase = useSupabaseClient();

	const [image, setImage] = useState<File | null>(null);
	const [caption, setCaption] = useState("");

	const createPost: FormEventHandler = async (evt) => {
		evt.preventDefault();

		if (image !== null) {
			const { data, error } = await supabase.storage
				.from("posts")
				.upload(`/${uuidv4()}.${image.name.split(".").pop()}`, image);

			if (!error) {
				const { error } = await supabase.from("posts").insert({
					image: data.path,
					caption,
				});
			} else {
				alert(error.message);
			}
		}
	};

	return (
		<DefaultLayout>
			<div className="mx-auto w-10/12 max-w-[1200px]">
				<Form onSubmit={createPost}>
					<div className="flex gap-12">
						{image ? (
							<motion.div
								className="relative flex w-5/12 flex-col border-2 border-slate-900"
								initial={{ y: 40, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									type: "spring",
									delay: 0.1,
									stiffness: 260,
									damping: 20,
								}}
							>
								<img
									src={URL.createObjectURL(image)}
									className="h-auto w-full rounded-3xl"
									alt=""
								/>
								<Button
									type="button"
									className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center bg-white p-[0px_!important]"
									onClick={() => setImage(null)}
								>
									<CloseIcon />
								</Button>
							</motion.div>
						) : (
							<ImageUpload onUpload={(image) => setImage(image)} />
						)}
						<div className="w-7/12">
							<Card>
								<Textarea
									id="caption"
									label="Caption"
									placeholder="goofy's baptism"
									required
									onChange={(evt) => setCaption(evt.target.value)}
								/>
								<Button variant="primary">Send it 😍</Button>
							</Card>
						</div>
					</div>
				</Form>
			</div>
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
		},
	};
};
