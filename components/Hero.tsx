"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "HTML", progress: 30 },
  { name: "CSS", progress: 50 },
  { name: "JavaScript", progress: 70 },
  { name: "React", progress: 80 },
  { name: "AI", progress: 90 },
];

const LandingSectionWithChart = () => {
  return (
    <section className="glass-card w-full min-h-auto flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6 py-16 text-white relative overflow-hidden">
      {/* Background blob or gradient blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 to-pink-500/10 blur-2xl z-0" />

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Master Skills, <br /> Get Real-Time Feedback
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Visualize your growth and progress with our smart learning assistant. Track improvements in real-time and get guidance that adapts to you.
          </p>
          <Button asChild className="btn-primary px-6 py-3 text-lg rounded-xl">
            <Link href="/learn">Start Learning</Link>
          </Button>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full h-64 sm:h-80 md:h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#10b981" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSectionWithChart;
