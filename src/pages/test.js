import Soup from "@/assets/icons/food/soup.svg";

export default function Test() {
  return (
    <div style={{ width: "100px", height: "100px", position: "relative" }}>

      <Soup style={{ fill: "white", width: "100%", height: "100%" }} />

      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, hotpink, orange)",
        }}
      />
    </div>
  );
}