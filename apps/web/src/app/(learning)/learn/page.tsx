import { LessonNode, LessonNodeStatus } from "@/components/features/learning/LessonNode";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LearnPage() {
  const mockLessons = [
    { id: "1", title: "Basics 1", status: "completed" as LessonNodeStatus },
    { id: "2", title: "Basics 2", status: "completed" as LessonNodeStatus },
    { id: "3", title: "Greetings", status: "completed" as LessonNodeStatus },
    { id: "4", title: "Family", status: "active" as LessonNodeStatus },
    { id: "5", title: "Food", status: "locked" as LessonNodeStatus },
    { id: "6", title: "Animals", status: "locked" as LessonNodeStatus },
  ];

  return (
    <div className="flex flex-col gap-8 items-center pb-24">
      {/* Unit Header */}
      <Card className="w-full max-w-xl bg-brand-primary border-none shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 text-white">
          <div>
            <h2 className="text-xl font-bold opacity-90 text-orange-100">Unit 1</h2>
            <h1 className="text-3xl font-extrabold tracking-tight">Form Foundation</h1>
          </div>
          <Button variant="outline" className="border-orange-300 text-orange-900 bg-orange-50 hover:bg-white">
            Guidebook
          </Button>
        </div>
      </Card>
      
      {/* The Learning Path Tree */}
      <div className="w-full flex justify-center py-8 relative">
        <div className="flex flex-col items-center gap-2 mt-4">
          {mockLessons.map((lesson, index) => (
             <LessonNode
               key={lesson.id}
               id={lesson.id}
               title={lesson.title}
               status={lesson.status}
               index={index}
             />
          ))}
          
           {/* Section Checkpoint */}
           <div className="w-24 h-24 mt-12 rounded-2xl bg-slate-200 border-4 border-slate-300 flex flex-col items-center justify-center text-slate-400 font-bold shadow-sm">
             <span className="text-2xl mb-1">🏰</span>
             Level Up
           </div>
        </div>
      </div>
    </div>
  );
}
