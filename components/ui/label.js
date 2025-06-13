import { cx } from "@/utils/all";

export default function Label(props) {

  const color = {
    green: "text-emerald-700",
    blue: "text-blue-600",
    orange: "text-orange-700",
    purple: "text-purple-600",
    pink: "text-pink-600",
    red: "text-red-600",
    yellow: "text-yellow-500",
    teal: "text-teal-600",
    cyan: "text-cyan-600",
    indigo: "text-indigo-600",
    lime: "text-lime-600",
    amber: "text-amber-600",
    violet: "text-violet-600",
    rose: "text-rose-600",
    sky: "text-sky-600",
    slate: "text-slate-600",
    zinc: "text-zinc-600",
    neutral: "text-neutral-600",
    stone: "text-stone-600"
  };


  const bgcolor = {
    green: "bg-emerald-50",
    blue: "bg-blue-50",
    orange: "bg-orange-50",
    purple: "bg-purple-50",
    pink: "bg-pink-50",
    red: "bg-red-50",
    yellow: "bg-yellow-50",
    teal: "bg-teal-50",
    cyan: "bg-cyan-50",
    indigo: "bg-indigo-50",
    lime: "bg-lime-50",
    amber: "bg-amber-50",
    violet: "bg-violet-50",
    rose: "bg-rose-50",
    sky: "bg-sky-50",
    slate: "bg-slate-50",
    zinc: "bg-zinc-50",
    neutral: "bg-neutral-50",
    stone: "bg-stone-50"
  };

  const margin = props.nomargin;

  if (props.pill) {
    return (
      <div
        className={
          "inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-blue-50 text-blue-500 rounded-full shrink-0 dark:bg-gray-800 dark:text-gray-300"
        }>
        {props.children}
      </div>
    );
  }

  return (
    <span
      className={cx(
        "inline-block text-xs font-medium tracking-wider uppercase ",
        !margin && " mt-5",
        color[props.color] || color[pink]
      )}>
      {props.children}
    </span>
  );
}
