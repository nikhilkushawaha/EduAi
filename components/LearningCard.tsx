import React, { useMemo } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import {
  cn,
  getInitials,
  getRandomTailwindColor,
} from "@/lib/utils";
import { getFeedbackByLearningId } from "@/lib/actions/general.action";

const LearningCard = async ({
  learnId,
  userId,
  background,
  topic,
  type,
  createdAt,
}: LearningCardProps) => {
  const feedback =
    userId && learnId
      ? await getFeedbackByLearningId({
          learnId,
          userId,
        })
      : null;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  const initials = getInitials(topic);
  const { bg, text } = getRandomTailwindColor();

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-learn">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600"
            )}
          >
            <p className="badge-text ">{background}</p>
          </div>

          {/* Cover Image */}
          <div
            className={`w-12 h-12 rounded-full border-2 border-gray-500 font-bold flex items-center justify-center shadow-2xl hover:shadow-lg transition ${bg} ${text}`}
          >
            {initials}
          </div>

          {/* Learned Role */}
          <h3 className="mt-5 capitalize">{topic}</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "You haven't learned this topic yet."}
          </p>
          <p>Learn it now</p>
        </div>

        <div className="flex flex-row justify-between">
          {/* <DisplayTechIcons techStack={techstack} /> */}

          <Button className="btn-primary">
            <Link
              href={
                feedback ? `/learn/${learnId}/feedback` : `/learn/${learnId}`
              }
            >
              {feedback ? "Check Feedback" : "View Questions"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
