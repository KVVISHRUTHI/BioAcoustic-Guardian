import AlertFeed from "./components/AlertFeed";
import ForestMap from "./components/ForestMap";
import BiodiversityChart from "./components/BiodiversityChart";
import AudioUpload from "./components/AudioUpload";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900">BioAcoustic Guardian</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time forest threat detection — Edge AI acoustic monitoring</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2"><ForestMap /></div>
          <div><AlertFeed /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <BiodiversityChart />
          <AudioUpload />
        </div>
      </div>
    </div>
  );
}