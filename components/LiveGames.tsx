export default function LiveGames() {
  const games = [
    "PUBG Tournament",
    "Free Fire Match",
    "CS2 Arena",
  ];

  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6">
      <h2 className="text-cyan-400 text-2xl font-bold mb-5">
        Live Games
      </h2>

      <div className="space-y-4">
        {games.map((game) => (
          <div
            key={game}
            className="bg-black/40 p-4 rounded-xl text-white"
          >
            {game}
          </div>
        ))}
      </div>
    </div>
  );
}