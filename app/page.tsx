'use client';

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
      <div className="flex flex-col items-center text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full animate-float">
        <h1 className="text-6xl font-extrabold text-blue-800 mb-6">
          <center>🏥 HOSPITAL SCHEDULER</center>
        </h1>
        <p className="text-gray-700 mb-10 text-xl">
         <center> Manage doctor appointments and schedules efficiently.
       </center> </p>
        <Link href="/schedule">
        <center> <button className="px-8 py-4 rounded-2xl bg-blue-700 text-white font-bold shadow-xl hover:bg-blue-800 hover:scale-105 transform transition duration-200 glow">
            Go to Schedule →
          </button></center>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 10px #3b82f6; }
          50% { box-shadow: 0 0 20px #60a5fa; }
        }
        .glow {
          animation: glowPulse 1.5s infinite alternate;
        }
      `}</style>
    </div>
  );
}
