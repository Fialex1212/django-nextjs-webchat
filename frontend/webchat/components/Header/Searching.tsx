import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import useSearchStore from "@/store/useSearchStore";

const Searching = () => {
  const { query, setQuery, getData } = useSearchStore();
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      await getData();
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        className="w-[340px] h-[40px]"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Searching;
