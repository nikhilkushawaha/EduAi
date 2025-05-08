import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import LearningCard from "@/components/LearningCard";

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
      <section className="glass-card">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Up Your Skills to Advance Your Carrier Path</h2>
          <p className="text-lg">Learn the topic & get your instant feedback</p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/learn">Start Learning</Link>
          </Button>
        </div>

        {/* <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        /> */}
      </section>

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
        <h2>Learned Topics</h2>

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
            <p>There are no learned topics</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
