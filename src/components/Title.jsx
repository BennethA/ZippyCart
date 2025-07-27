export default function Title({ text1, text2 }) {
  return (
    <div className="text-center my-4">
      <h1 className="inline-flex gap-2 px-4 py-2 border-x-4 border-gray-400 text-2xl font-bold">
        <span className="text-gray-600 dark:text-[#c0c0c0]">{text1}</span>
        <span>{text2}</span>
      </h1>
    </div>
  );
}
