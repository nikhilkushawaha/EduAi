// app/feedback/[id]/page.tsx

import { redirect } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getLearningById,
  getFeedbackByLearningId,
} from "@/lib/actions/general.action";

import { Button } from "@/components/ui/button";
import { Learned, Feedback } from "@/types/feedback"; // Adjust the import path as needed
import FeedbackChart from "@/components/FeedbackClient"; // Optional: chart component

interface RouteParams {
  params: {
    id: string;
  };
}

const FeedbackPage = async ({ params }: RouteParams) => {
  const { id } = params;
  const user = await getCurrentUser();

  const learn: Learned | null = await getLearningById(id);
  if (!learn) redirect("/");

  const feedback: Feedback | null = await getFeedbackByLearningId({
    learnId: id,
    userId: user?.id!,
  });

  if (!feedback) redirect("/");

  return (
    <section className="glass-card min-h-screen px-6 py-10 space-y-10  bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-gray-200">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 to-pink-500/10 blur-2xl z-0" />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Feedback Summary –{" "}
          <span className="capitalize text-primary">{learn.background}</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-500">
          <div className="flex items-center gap-2">
            <Image src="/star.svg" width={20} height={20} alt="star" />
            <span>
              <strong className="text-indigo-600">{feedback.totalScore}</strong>/100
              Overall Score
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/calendar.svg" width={20} height={20} alt="calendar" />
            <span>
              {dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}
            </span>
          </div>
        </div>

        <hr />

        {/* Final Summary */}
        <p className="text-lg leading-relaxed italic">
          "{feedback.finalAssessment}"
        </p>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">📊 Breakdown by Category:</h2>
          {feedback.categoryScores.map((category, index) => (
            <div key={index} className="p-4 rounded-md border bg-muted/40">
              <p className="font-bold text-base">
                {index + 1}. {category.name} – {category.score}/100
              </p>
              <p className="text-sm mt-1">{category.comment}</p>
            </div>
          ))}
        </div>

        {/* Optional: Chart */}
        <FeedbackChart data={feedback.categoryScores} />

        {/* Strengths */}
        <div>
          <h3 className="text-lg font-semibold">✅ Strengths</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {feedback.strengths.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div>
          <h3 className="text-lg font-semibold">🛠️ Areas for Improvement</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {feedback.areasForImprovement.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button variant="secondary" asChild className="flex-1">
            <Link href="/">Back to Dashboard</Link>
          </Button>

          <Button variant="default" asChild className="flex-1">
            <Link href={`/learn/${id}`}>Restart</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
