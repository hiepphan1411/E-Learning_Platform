function UserInfo({ image, name }) {
  return (
    <div className="flex items-center justify-aroun px-6 py-2 gap-2 bg-gray-200 rounded-2xl shadow-xl hover:bg-gray-100 hover:text-teal-400 hover:scale-95 duration-200">
      <img src={image} alt="Avatar" className="w-8 h-8 rounded-2xl"></img>
      <div className="text-">{name}</div>
    </div>
  );
}

export default UserInfo;
