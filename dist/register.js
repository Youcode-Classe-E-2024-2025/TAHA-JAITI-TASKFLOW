var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const createRegister = () => {
    const registerElement = document.createElement('div');
    registerElement.id = 'registerContainer';
    registerElement.className = 'class="h-full w-full flex items-center justify-center';
    registerElement.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-md shadow-md w-96">
            <h2 class="text-2xl font-bold text-purple-500 mb-6">Register for TaskFlow</h2>
            <form id="registerForm" class="space-y-4">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-300">Username</label>
                    <input type="text" id="username" name="username" required
                        class="input" />
                </div>
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
                    class="btn_primary">
                    Register
                </button>
            </form>
            <p class="mt-4 text-sm text-gray-400">
                Already have an account? <a href="/login" class="text-purple-500 hover:text-purple-400">Login here</a>
            </p>
        </div>
        `;
    return registerElement;
};
export const handleRegister = () => __awaiter(void 0, void 0, void 0, function* () {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const data = new FormData(registerForm);
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');
        const role = "employee";
        // send a reuqest the server
        try {
            const response = yield fetch('http://localhost/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, role })
            });
            const result = yield response.json();
            if (response.ok) {
                console.log('Register successful', result);
            }
        }
        catch (err) {
            console.error('Error', err);
            alert('Error registering');
        }
    }
});
