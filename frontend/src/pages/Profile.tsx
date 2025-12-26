import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import Avatar from "../components/ui/Avatar";
import { updateAvatar } from "../api/api";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file); // Keep the actual file for upload
      setAvatarPreview(URL.createObjectURL(file)); // For preview
    }
  };

  const handleSave = async () => {
    if (!user || !avatarFile) return;

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile); // must match multer field name

      const response = await updateAvatar(user.token, formData); // updateAvatar needs FormData
      setUser({ ...user, avatar: response.data.avatar });

      setEditing(false);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  return (
    <div className="min-h-screen relative c flex items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md relative bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-6">
        {/* Avatar */}
        <button
          className=" absolute cursor-pointer z-10 hover:bg-green-300 w-8 h-8 text-center p-1 rounded-full"
          onClick={() => navigate("/")}
          type="button"
        >
          <ArrowLeft className="cursor-pointer" />{" "}
        </button>
        <div className="flex flex-col items-center gap-3 relative">
          <Avatar
            className="w-24 h-24 ring-2 ring-green-500"
            user={avatarPreview}
          />
          {editing && (
            <label className="absolute bottom-0 right-0 cursor-pointer bg-green-500 hover:bg-green-700 text-white p-1 rounded-full text-sm">
              Edit
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          )}
          <h2 className="text-2xl font-bold text-green-700">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* Editable Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border ${
                editing ? "border-green-400" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${
                editing ? "border-green-400" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          {editing ? (
            <>
              <Button
                className="bg-green-500 hover:bg-green-700 text-white"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              className="bg-green-500 hover:bg-green-700 text-white w-full"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
