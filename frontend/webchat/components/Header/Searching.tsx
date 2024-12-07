import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import useSearchStore from "@/stores/useSearchStore";

const Searching = () => {
  const { query, setQuery, getData } = useSearchStore();
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      await getData();
    }
  };

  return (
    <div className="invisible sm:visible w-0 sm:w-fit">
      <form onSubmit={handleSearch}>
        <Input
          className="w-[280px] h-[40px]"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Searching;
