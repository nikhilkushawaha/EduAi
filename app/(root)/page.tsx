import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import LearningCard from "@/components/LearningCard";
import Hero from "@/components/Hero";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getLearningsByUserId,
  getLatestLearnings,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userLearnings, allLearning] = await Promise.all([
    getLearningsByUserId(user?.id!),
    getLatestLearnings({ userId: user?.id! }),
  ]);

  const hasPastLearnings = userLearnings?.length! > 0;
  const hasUpcomingLearnings = allLearning?.length! > 0;

  return (
    <>
    <Hero />

      <section className="glass-card flex flex-col gap-6 mt-8">
        <h2>Your Learning</h2>

        <div className="learns-section">
          {hasPastLearnings ? (
            userLearnings?.map((learn) => (
              <LearningCard
                key={learn.id}
                userId={user?.id}
                learnId={learn.id}
                background={learn.background}
                topic={learn.topic}
                type={learn.type}
                level={learn.level}
                createdAt={learn.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t learn anything yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Continue Learning With</h2>

        <div className="learns-section">
          {hasUpcomingLearnings ? (
            allLearning?.map((learn) => (
              <LearningCard
                key={learn.id}
                userId={user?.id}
                learnId={learn.id}
                background={learn.background}
                topic={learn.topic}
                level={learn.level}
                type={learn.type}
                createdAt={learn.createdAt}
              />
            ))
          ) : (
            <p>Start your learning jurney now.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
