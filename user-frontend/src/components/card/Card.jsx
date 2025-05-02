function Card({ title, image }) {
  return (
    <div className="card-container flex flex-col justify-center items-center rounded-[12px] bg-gray-100 py-10 px-10   shadow-lg hover:scale-110 hover:bg-white duration-200 hover:text-teal-600 hover:shadow-2xl h-full">
      {image}
      <div className="card-title text-center mt-4">{title}</div>
    </div>
  );
}

export default Card;
