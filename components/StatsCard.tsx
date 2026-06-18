type Props = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-2xl p-5">
      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="text-white text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}