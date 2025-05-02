function CustomButton({ title, img, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-400 shadow-lg hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-[12px] 
      flex items-center transition-colors duration-300"
    >
      <img src={img}></img>
      {title}
    </button>
  );
}

export default CustomButton;
