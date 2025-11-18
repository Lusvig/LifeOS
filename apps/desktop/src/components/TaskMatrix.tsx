import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@lifeos/ui';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { ArrowRight, Plus } from 'lucide-react';

interface TaskCardData {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const INITIAL_TASKS = {
  todo: [
    { id: '1', title: 'Review docs', priority: 'high' as const },
    { id: '2', title: 'Code review', priority: 'medium' as const },
  ],
  done: [
    { id: '3', title: 'Morning standup', priority: 'low' as const },
  ],
};

function TaskCard({ task, isDragging }: { task: TaskCardData; isDragging: boolean }): JSX.Element {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  const priorityColors = {
    low: 'bg-blue-500/20 border-blue-500/30',
    medium: 'bg-yellow-500/20 border-yellow-500/30',
    high: 'bg-orange-500/20 border-orange-500/30',
    critical: 'bg-red-500/20 border-red-500/30',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-lg cursor-grab active:cursor-grabbing border transition-all ${priorityColors[task.priority]}`}
    >
      <p className="font-medium text-sm">{task.title}</p>
    </div>
  );
}

function DroppableColumn({
  id,
  title,
  tasks,
  onDrop,
}: {
  id: string;
  title: string;
  tasks: TaskCardData[];
  onDrop: (taskId: string) => void;
}): JSX.Element {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="glass-panel p-4 rounded-lg min-h-[300px] flex flex-col"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        {title}
        <span className="text-xs bg-white/10 rounded px-2 py-1">{tasks.length}</span>
      </h3>
      <div className="space-y-3 flex-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} isDragging={false} />
        ))}
      </div>
      <button className="mt-4 w-full p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white">
        <Plus size={16} />
        Add Task
      </button>
    </div>
  );
}

export default function TaskMatrix(): JSX.Element {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleDragEnd = (taskId: string, toStatus: string) => {
    const fromStatus = Object.keys(tasks).find((status) =>
      tasks[status as keyof typeof tasks].some((t) => t.id === taskId),
    ) as keyof typeof tasks;

    if (!fromStatus || fromStatus === toStatus) return;

    const task = tasks[fromStatus].find((t) => t.id === taskId);
    if (!task) return;

    setTasks({
      ...tasks,
      [fromStatus]: tasks[fromStatus].filter((t) => t.id !== taskId),
      [toStatus as keyof typeof tasks]: [
        ...tasks[toStatus as keyof typeof tasks],
        task,
      ],
    });
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Task Matrix
          <ArrowRight size={20} className="text-white/50" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext>
          <div className="grid grid-cols-2 gap-4">
            <DroppableColumn
              id="todo"
              title="To Do"
              tasks={tasks.todo}
              onDrop={(taskId) => handleDragEnd(taskId, 'todo')}
            />
            <DroppableColumn
              id="done"
              title="Done"
              tasks={tasks.done}
              onDrop={(taskId) => handleDragEnd(taskId, 'done')}
            />
          </div>
        </DndContext>
      </CardContent>
    </Card>
  );
}
