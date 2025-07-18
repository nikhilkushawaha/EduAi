import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomLearningCover, getInitials, getRandomTailwindColor} from "@/lib/utils";

import {
  getFeedbackByLearningId,
  getLearningById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const LearningDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const learn = await getLearningById(id);
  if (!learn) redirect("/");

  const feedback = await getFeedbackByLearningId({
    learnId: id,
    userId: user?.id!,
  });

    const initials = getInitials(learn.background);
    const { bg, text } = getRandomTailwindColor();

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <div
            className={`w-12 h-12 rounded-full border-2 border-gray-500 font-bold flex items-center justify-center shadow-2xl hover:shadow-lg transition ${bg} ${text}`}
          >
            {initials}
          </div>
            <h3 className="capitalize">{learn.background}</h3>
          </div>
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">{learn.type}</p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        learnId={id}
        type="learn"
        questions={learn.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default LearningDetails;
