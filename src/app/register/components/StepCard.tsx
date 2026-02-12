export default function StepCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-2xl min-h-[450px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col">
      {children}
    </div>
  );
}
