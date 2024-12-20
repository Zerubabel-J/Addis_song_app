import { RingLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        paddingTop: "10%",
      }}
    >
      <RingLoader color="#0724e8" size={100} />
    </div>
  );
};

export default Loader;
