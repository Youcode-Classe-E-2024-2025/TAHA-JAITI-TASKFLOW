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
    registerElement.className = 'h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4';
    registerElement.innerHTML = `
        <div class="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Create Account
                </h2>
                <p class="text-gray-400 mt-2">Join TaskFlow to get started</p>
            </div>

            <form id="registerForm" class="space-y-6">
                <div class="space-y-1">
                    <label for="username" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-user mr-2 text-purple-400"></i>Username
                    </label>
                    <input type="text" id="username" name="username" required
                        class="input" 
                        placeholder="Choose a username"/>
                </div>

                <div class="space-y-1">
                    <label for="email" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-envelope mr-2 text-purple-400"></i>Email
                    </label>
                    <input type="email" id="email" name="email" required
                        class="input" 
                        placeholder="Enter your email"/>
                </div>

                <div class="space-y-1">
                    <label for="password" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-lock mr-2 text-purple-400"></i>Password
                    </label>
                    <input type="password" id="password" name="password" required
                        class="input" 
                        placeholder="Create a password"/>
                </div>

                <button type="submit" class="btn_primary w-full flex items-center justify-center gap-2">
                    <i class="fa-solid fa-user-plus"></i>
                    Create Account
                </button>
            </form>

            <div class="mt-8 text-center">
                <p class="text-gray-400">
                    Already have an account? 
                    <a href="/login" id="registerLink" class="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors">
                        Sign in
                    </a>
                </p>
            </div>
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
            const response = yield fetch('http://localhost/api/register', {
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
