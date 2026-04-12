export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Quên mật khẩu</h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Nhập email của bạn để nhận link đặt lại mật khẩu
      </p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#e30019]"
            placeholder="Nhập email của bạn"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-[#e30019] text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Gửi link đặt lại mật khẩu
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          <a href="/dang-nhap" className="text-[#e30019] hover:underline font-medium">← Quay lại đăng nhập</a>
        </p>
      </div>
    </>
  );
}
