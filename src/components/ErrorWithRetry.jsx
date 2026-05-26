function ErrorWithRetry({ message, onRetry, isLoading = false }) {
  return (
    <div className="text-center py-4">
      <div className="alert alert-danger" role="alert">
        {message || 'Произошла ошибка при загрузке данных'}
      </div>
      <button 
        className="btn btn-outline-primary"
        onClick={onRetry}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Повторить запрос'}
      </button>
    </div>
  );
}

export default ErrorWithRetry;