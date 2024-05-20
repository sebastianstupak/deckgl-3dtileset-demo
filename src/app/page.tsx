import Image from "next/image";
import Link from "next/link";


const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href={"/dashboard"}>
        Dashboard
      </Link>
    </div>
  );
}

export default Home;