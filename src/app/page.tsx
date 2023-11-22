import Forecast from "@/app/Forecast";
import CropsFilter from "@/app/CropsFilter";

const theme = {
  background: "#f0f0f0",
  backgroundCard: "#f5f5f5",
  backgroundUnselectedCard: "#e1e1e1",
  text: "#212121",
  textSecondary: "#757575",
  colorShadow: "#e1e1e1aa",
};
export default function Home() {
  return (
    <main
      className="light"
      style={{
        background: theme.background,
        color: theme.text,
      }}
    >
      <div className="lg:px-32">
        <Forecast />
      </div>
    </main>
  );
}
