import { PiBuildingFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
export default function Dashborad(params) {
  const { School, loading } = useSelector((state) => state.School);

  return (
    <div className="p-2">
      <div className="flex flex-col relative overflow-hidden max-w-52 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-slate-500">
        <label className="font-bold text-white">School</label>
        <span className="font-bold text-white">{School.length}</span>
        <div className="absolute top-5  opacity-30 right-0 text-6xl">
          <PiBuildingFill />
        </div>
      </div>
    </div>
  );
}
