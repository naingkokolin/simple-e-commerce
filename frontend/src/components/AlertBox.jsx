const alertStyles = {
  success: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-500",
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-500",
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-500",
  },
};

const AlertBox = ({ type, message, title }) => {
  const styles = alertStyles[type] || alertStyles.success;

  return (
    <div
      className={`p-4 my-4 rounded-lg border-l-4 ${styles.bg} ${styles.text} ${styles.border}`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
        </div>
        <div className="ml-3 text-sm font-medium">
          {title && <span className="font-bold mr-1">{title}</span>}
          {message}
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
