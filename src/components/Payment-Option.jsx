export default function PaymentOption({
  option,
  selectedPayment,
  setSelectedPayment,
}) {
  const isSelected = selectedPayment?.name === option.name;

  return (
    <button
      onClick={() => setSelectedPayment(option)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
        isSelected ? "dark:border-white border-black border-2" : "hover:opacity-80 border-2 border-gray-300 dark:border-gray-600"
      }`}
    >
      {isSelected && <div className="w-3 h-3 rounded-full bg-green-700"></div>}
      {option.logo ? option.logo : <p className="bg-yellow-600 font-extrabold italic font-sans text-xs h-6 flex items-center justify-center px-2"><span className="bg-white text-yellow-600 px-1 rounded-full h-4">MoMo</span> </p>}
      <span>{option.name}</span>
    </button>
  );
}
