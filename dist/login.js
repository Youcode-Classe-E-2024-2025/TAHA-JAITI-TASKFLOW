var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const createLogin = () => {
    const loginElement = document.createElement('div');
    loginElement.id = 'loginContainer';
    loginElement.className = 'h-full w-full flex items-center justify-center';
    loginElement.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-sm shadow-md w-96">
                <h2 class="text-2xl font-bold text-purple-500 mb-6">Login to TaskFlow</h2>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" id="email" name="email" required
                            class="input" />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
                        <input type="password" id="password" name="password" required
                            class="input" />
                    </div>
                    <button type="submit"
                        class="btn_primary w-full">
                        Log In
                    </button>
                </form>
                <p class="mt-4 text-sm text-gray-400">
                    Don't have an account? <a href="/register" id="loginLink" class="text-purple-500 hover:text-purple-400">Register
                        here<a/>
                </p>
            </div>
        `;
    return loginElement;
};
export const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const data = new FormData(loginForm);
        const email = data.get('email');
        const password = data.get('password');
        // send a reuqest the server
        try {
            const response = yield fetch('http://localhost/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = yield response.json();
            if (response.ok) {
                console.log('Login successful', result);
                sessionStorage.setItem('user_id', String(result.data.user_Id));
                sessionStorage.setItem('role', result.data.role);
            }
        }
        catch (err) {
            console.error('Error', err);
            alert('Error logging in');
        }
    }
});
